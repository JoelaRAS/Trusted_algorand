import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DonatePopupProps {
  onSubmit: (amount: number) => void;
}

export const DonatePopup: React.FC<DonatePopupProps> = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleSubmit = () => {
    onSubmit(amount);
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            Faire un don
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Faire un don</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="number"
              placeholder="Montant en €"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <Button onClick={handleSubmit}>Soumettre</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};