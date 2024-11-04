from algosdk import account, transaction
from algosdk.v2client import algod
from algosdk.transaction import ApplicationNoOpTxn, PaymentTxn
from algosdk.mnemonic import to_private_key
from pyteal import *

# Configuration de l'algod client
algod_token = ""  # Remplacez par votre token
algod_address = "https://testnet-api.4160.nodely.dev"  # Adresse du serveur
algod_port = ""  # Port du serveur

algod_client = algod.AlgodClient(algod_token, algod_address, algod_port)

# Comptes de test
wallet_address = "UVLF2BBZGDNNCHSMRF55HRA7KXAXXDK7NJLBDCMG2VX5NZM2SOAIYV3ENA"
wallet_private_key = to_private_key("icon retreat hour pull hen together glow fossil often blame smart defy embark normal share custom scatter lake path column gap potato chef abstract width")

# ID de l'application (à remplacer par l'ID réel après déploiement)
app_id = 728336431

# Fonction pour soumettre un projet
def submit_project(title, description, category, impact, location):
    params = algod_client.suggested_params()
    txn = ApplicationNoOpTxn(
        sender=wallet_address,
        sp=params,
        index=app_id,
        app_args=[
            "submit_project",
            title,
            description,
            category,
            impact,
            location
        ]
    )
    signed_txn = txn.sign(wallet_private_key)
    txid = algod_client.send_transaction(signed_txn)
    print(f"Projet soumis avec succès. TXID: {txid}")

# Fonction pour soumettre un devis
def submit_bid(bid_id, bid_amount, funding_period, milestone_data):
    params = algod_client.suggested_params()
    txn = ApplicationNoOpTxn(
        sender=wallet_address,
        sp=params,
        index=app_id,
        app_args=[
            "submit_bid",
            bid_id,
            bid_amount,
            funding_period,
            milestone_data
        ]
    )
    signed_txn = txn.sign(wallet_private_key)
    txid = algod_client.send_transaction(signed_txn)
    print(f"Devis soumis avec succès. TXID: {txid}")

# Fonction pour financer un projet
def fund_project(project_id, amount):
    params = algod_client.suggested_params()
    txn = PaymentTxn(
        sender=wallet_address,
        receiver=project_id,
        amt=amount,
        sp=params
    )
    signed_txn = txn.sign(wallet_private_key)
    txid = algod_client.send_transaction(signed_txn)
    print(f"Projet financé avec succès. TXID: {txid}")

# Fonction pour vérifier le statut d'un projet
def check_project_status(project_id):
    app_info = algod_client.application_info(project_id)
    if 'params' in app_info and 'global-state' in app_info['params']:
        print(f"Statut du projet: {app_info['params']['global-state']}")
    else:
        print(f"Erreur: 'global-state' non trouvé dans app_info. Réponse complète: {app_info}")

# Exemple d'utilisation des fonctions
if __name__ == "__main__":
    # Soumettre un projet
    submit_project(
        title="École Rurale Solaire",
        description="Installation de panneaux solaires pour une école rurale.",
        category="Énergie",
        impact="Accès à l'électricité",
        location="Rural"
    )

    # Soumettre un devis
    submit_bid(
        bid_id="1",
        bid_amount=5000,
        funding_period=30,
        milestone_data="Étape 1: Installation des panneaux"
    )

    # Financer un projet
    fund_project(
        project_id="UVLF2BBZGDNNCHSMRF55HRA7KXAXXDK7NJLBDCMG2VX5NZM2SOAIYV3ENA",
        amount=1000000  # Montant en microAlgos
    )

    # Vérifier le statut d'un projet
    check_project_status(project_id=728336431)