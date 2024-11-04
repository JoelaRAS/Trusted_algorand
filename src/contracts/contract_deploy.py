import base64
import algosdk
from algosdk.v2client import algod
from algosdk.transaction import ApplicationCreateTxn, StateSchema
from algosdk import account, mnemonic

# Configuration de Nodely pour le testnet
algod_address = "https://testnet-api.4160.nodely.dev"
algod_token = ""
algod_client = algod.AlgodClient(algod_token, algod_address)

# Phrase mnémonique
mnemonic_phrase = "icon retreat hour pull hen together glow fossil often blame smart defy embark normal share custom scatter lake path column gap potato chef abstract width"
private_key = mnemonic.to_private_key(mnemonic_phrase)
sender_address = account.address_from_private_key(private_key)

# Charger les fichiers TEAL
with open("approval.teal", "r") as f:
    approval_program = f.read()

with open("clear.teal", "r") as f:
    clear_program = f.read()

# Fonction pour compiler le TEAL
# Fonction pour compiler le TEAL avec le client Algod
def compile_program(client, source_code):
    try:
        compile_response = client.compile(source_code)
        print("Réponse de la compilation :", compile_response)  # Ajout pour déboguer
        # Décodage base64 au lieu de fromhex()
        return base64.b64decode(compile_response["result"])
    except Exception as e:
        print(f"Erreur lors de la compilation du programme TEAL : {e}")
        return None

try:
    # Compiler les programmes TEAL
    approval_teal = compile_program(algod_client, approval_program)
    clear_teal = compile_program(algod_client, clear_program)

    # Schémas d'état global et local
    global_schema = StateSchema(num_uints=2, num_byte_slices=1)
    local_schema = StateSchema(num_uints=2, num_byte_slices=1)

    # Récupérer les paramètres de transaction
    params = algod_client.suggested_params()

    # Créer la transaction de création d'application
    txn = ApplicationCreateTxn(
        sender=sender_address,
        sp=params,
        on_complete=algosdk.transaction.OnComplete.NoOpOC,
        approval_program=approval_teal,
        clear_program=clear_teal,
        global_schema=global_schema,
        local_schema=local_schema,
    )

    # Signer et envoyer la transaction
    signed_txn = txn.sign(private_key)
    tx_id = algod_client.send_transaction(signed_txn)

    # Attendre la confirmation de la transaction
    def wait_for_confirmation(client, txid):
        last_round = client.status().get("last-round")
        while True:
            tx_info = client.pending_transaction_info(txid)
            if tx_info.get("confirmed-round") and tx_info["confirmed-round"] > 0:
                print("Transaction confirmée dans le round", tx_info["confirmed-round"])
                return tx_info
            else:
                print("En attente de confirmation...")
                last_round += 1
                client.status_after_block(last_round)

    tx_info = wait_for_confirmation(algod_client, tx_id)
    app_id = tx_info["application-index"]
    print("Application ID:", app_id)

except Exception as e:
    print(f"Erreur lors du déploiement du contrat : {e}")
