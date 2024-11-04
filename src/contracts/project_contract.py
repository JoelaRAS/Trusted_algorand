from pyteal import *

def approval_program():
    return Approve()  # Remplacez par la logique réelle du smart contract

def clear_state_program():
    return Approve()

if __name__ == "__main__":
    # Compiler le code en version 5 sans répéter #pragma
    compiled_approval = compileTeal(approval_program(), mode=Mode.Application, version=5)
    compiled_clear = compileTeal(clear_state_program(), mode=Mode.Application, version=5)
    
    # Écriture des fichiers TEAL avec une seule ligne #pragma version 5
    with open("approval.teal", "w") as f:
        f.write(compiled_approval)
    with open("clear.teal", "w") as f:
        f.write(compiled_clear)
