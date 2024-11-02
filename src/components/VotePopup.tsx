import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface VotePopupProps {
  onSubmit: () => void;
}

export const VotePopup: React.FC<VotePopupProps> = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    onSubmit();
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            Voter pour ce devis
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Voter pour ce devis</DialogTitle>
          </DialogHeader>
          <Button onClick={handleSubmit}>Soumettre</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};