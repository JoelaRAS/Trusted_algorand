from pyteal import *

def approval_program():
    return Approve()

def clear_state_program():
    return Approve()

if __name__ == "__main__":
    # Compilation du code en TEAL
    compiled_approval = compileTeal(approval_program(), mode=Mode.Application, version=5)
    compiled_clear = compileTeal(clear_state_program(), mode=Mode.Application, version=5)

    # Sauvegarde des fichiers TEAL pour le déploiement
    with open("approval.teal", "w") as f:
        f.write(compiled_approval)
    with open("clear.teal", "w") as f:
        f.write(compiled_clear)
