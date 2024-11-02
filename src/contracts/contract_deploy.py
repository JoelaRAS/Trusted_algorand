import base64
from algosdk.v2client import algod
from algosdk.transaction import ApplicationCreateTxn, OnComplete, StateSchema
from pyteal import compileTeal, Mode, Approve


# Programme de l'approbation
def approval_program():
    return Approve()

# Programme pour effacer l'état
def clear_state_program():
    return Approve()

# Configuration du client pour LocalNet
algod_address = "http://localhost:4001"
algod_token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"  # Token par défaut
algod_client = algod.AlgodClient(algod_token, algod_address)


# Compilation du programme PyTeal en TEAL
approval_teal = compileTeal(approval_program(), mode=Mode.Application, version=5)
clear_teal = compileTeal(clear_state_program(), mode=Mode.Application, version=5)

# Fonction pour déployer le contrat
def deploy_contract():
    creator_address = "474SFCAW3BCVUBNLNDFDWJT4NABYKCDGMNPT26MJTKA2J7ZHFZF6VV5N3I"
    creator_private_key = "tibcxXA5S7wJqRkpEQ6R8ob+wRWf4q4sP16wtLvpItjn+SKIFthFWgWraMo7JnxoA4UIZmNfPXmJmoGk/ycuSw=="

    # Paramètres de la transaction
    params = algod_client.suggested_params()

    # Compilation des programmes en TEAL
    approval_result = algod_client.compile(approval_teal)
    clear_result = algod_client.compile(clear_teal)

    # Impression des hash
    print(f"Hash du programme d'approbation : {approval_result['hash']}")
    print(f"Hash du programme d'effacement : {clear_result['hash']}")

    approval_program_bytes = base64.b64decode(approval_result['result'])
    clear_program_bytes = base64.b64decode(clear_result['result'])

    txn = ApplicationCreateTxn(
        sender=creator_address,
        sp=params,
        on_complete=OnComplete.NoOpOC,
        approval_program=approval_program_bytes,
        clear_program=clear_program_bytes,
        global_schema=StateSchema(num_uints=2, num_byte_slices=1),
        local_schema=StateSchema(num_uints=2, num_byte_slices=1)
    )

    signed_txn = txn.sign(creator_private_key)
    tx_id = algod_client.send_transaction(signed_txn)
    print(f"Transaction envoyée avec l'ID : {tx_id}")

    try:
        confirmed_txn = algod_client.pending_transaction_info(tx_id)
        print(f"Contrat déployé avec l'App ID : {confirmed_txn['application-index']}")
    except Exception as e:
        print(f"Erreur lors de la confirmation de la transaction : {e}")

if __name__ == "__main__":
    deploy_contract()
