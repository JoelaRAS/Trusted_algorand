from algosdk import account, mnemonic

# Génération de la clé
private_key, address = account.generate_account()

# Obtenir la phrase mnémonique pour le backup
mnemonic_phrase = mnemonic.from_private_key(private_key)

print("Adresse :", address)
print("Clé privée :", private_key)
print("Mnémonique :", mnemonic_phrase)
