
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAppStore } from '@/hooks/use-app-store';

export function AddTransactionDialog({ children }: { children: React.ReactNode }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { addTransaction, addNotification } = useAppStore();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!description || !amount || !category) {
        toast({
            title: "Validation Error",
            description: "Please fill out all fields.",
            variant: "destructive"
        });
        return;
    }

    const newTransaction = {
        id: Date.now().toString(),
        description,
        amount: -parseFloat(amount), // Assuming expenses are negative
        category,
        date: new Date().toISOString().split('T')[0],
        group: 'Personal' // Default group for now
    };
    addTransaction(newTransaction);
    addNotification({
        id: Date.now().toString(),
        message: `New expense added: ${description}`,
        read: false,
    });

    toast({
        title: "Success!",
        description: "Your transaction has been added."
    });
    
    // Reset form and close dialog
    setDescription('');
    setAmount('');
    setCategory('');
    setIsDialogOpen(false); 
  };

  const expenseCategories = [
    "Groceries", "Utilities", "Rent", "Transportation", "Entertainment", 
    "Dining", "Shopping", "Travel", "Healthcare", "Education", "Personal Care", "Other"
  ];

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogDescription>
              Enter the details of your expense and select a category.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                placeholder="e.g. Coffee with Jane"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount (₹)
              </Label>
              <Input id="amount" type="number" placeholder="0.00" className="col-span-3" value={amount} onChange={e => setAmount(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <div className="col-span-3 relative">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseCategories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Transaction</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
