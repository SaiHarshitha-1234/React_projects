
'use client';

import { useState, useEffect } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { useAppStore } from '@/hooks/use-app-store';
import type { Group } from '@/hooks/use-app-store';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

type SplitType = 'equally' | 'custom' | 'percentage';

export function SplitExpenseDialog({ children, group: initialGroup }: { children: React.ReactNode, group: Group }) {
  const [splitType, setSplitType] = useState<SplitType>('equally');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [customAmounts, setCustomAmounts] = useState<Record<string, number>>({});
  const [customPercentages, setCustomPercentages] = useState<Record<string, number>>({});
  const { toast } = useToast();
  const { splitExpense, addNotification, user, groups } = useAppStore();

  const group = groups.find(g => g.name === initialGroup.name) || initialGroup;

  useEffect(() => {
    // Reset state when dialog opens or group changes
    if (isDialogOpen) {
      setSplitType('equally');
      const members = group.members || [];
      const initialCustoms = members.reduce((acc, member) => {
        acc[member.id] = 0;
        return acc;
      }, {} as Record<string, number>);
      setCustomAmounts(initialCustoms);
      setCustomPercentages(initialCustoms);
    }
  }, [isDialogOpen, group]);


  const handleCustomAmountChange = (memberId: string, value: string) => {
    const amount = parseFloat(value) || 0;
    setCustomAmounts(prev => ({ ...prev, [memberId]: amount }));
  };
  
  const handleCustomPercentageChange = (memberId: string, value: string) => {
    const percentage = parseFloat(value) || 0;
    setCustomPercentages(prev => ({...prev, [memberId]: percentage}));
  }

  const validateCustomSplit = () => {
    const sum = Object.values(customAmounts).reduce((acc, val) => acc + val, 0);
    return Math.abs(sum - group.expenses) < 0.01;
  };
  
  const validatePercentageSplit = () => {
    const sum = Object.values(customPercentages).reduce((acc, val) => acc + val, 0);
    return Math.abs(sum - 100) < 0.01;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (splitType === 'custom' && !validateCustomSplit()) {
        toast({ title: "Validation Error", description: "Custom amounts must add up to the total group expense.", variant: "destructive" });
        return;
    }

    if (splitType === 'percentage' && !validatePercentageSplit()) {
        toast({ title: "Validation Error", description: "Percentages must add up to 100%.", variant: "destructive" });
        return;
    }

    if (!user) {
        toast({ title: "Error", description: "You must be logged in to split an expense.", variant: "destructive" });
        return;
    }

    splitExpense(group.name, {
      splitType,
      customAmounts: splitType === 'custom' ? customAmounts : {},
      customPercentages: splitType === 'percentage' ? customPercentages : {}
    });

    addNotification({
        id: Date.now().toString(),
        message: `Expenses settled in "${group.name}"`,
        read: false,
    });

    toast({ title: "Success!", description: "The group's expenses have been split." });
    
    // Reset form and close dialog
    setSplitType('equally');
    setCustomAmounts({});
    setCustomPercentages({});
    setIsDialogOpen(false); 
  };

  const members = group.members || [];
  const amountPerPerson = members.length > 0 ? (group.expenses || 0) / members.length : 0;
  
  const customTotal = Object.values(customAmounts).reduce((acc, val) => acc + val, 0);
  const remainingAmount = (group.expenses || 0) - customTotal;
  
  const percentageTotal = Object.values(customPercentages).reduce((acc, val) => acc + val, 0);
  const remainingPercentage = 100 - percentageTotal;


  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Split Expenses in {group.name}</DialogTitle>
            <DialogDescription>
              Split the total group expense of <span className="font-bold">₹{group.expenses.toLocaleString()}</span> among the members.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] p-1">
            <div className="grid gap-6 py-4 pr-4">

              <RadioGroup value={splitType} onValueChange={(value) => setSplitType(value as SplitType)} className="grid grid-cols-3 gap-2">
                  <div>
                      <RadioGroupItem value="equally" id="equally" className="peer sr-only" />
                      <Label htmlFor="equally" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary text-sm h-full">
                          Equally
                      </Label>
                  </div>
                   <div>
                      <RadioGroupItem value="percentage" id="percentage" className="peer sr-only" />
                      <Label htmlFor="percentage" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary text-sm h-full">
                          Percentage
                      </Label>
                  </div>
                   <div>
                      <RadioGroupItem value="custom" id="custom" className="peer sr-only" />
                      <Label htmlFor="custom" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary text-sm h-full">
                          Custom
                      </Label>
                  </div>
              </RadioGroup>

              {splitType === 'equally' && (
                  <div className='text-center text-sm text-muted-foreground p-4 bg-muted/50 rounded-lg'>
                      Each person owes <span className='font-bold text-foreground'>₹{amountPerPerson.toFixed(2)}</span>
                  </div>
              )}

              {splitType === 'percentage' && (
                  <div className='space-y-4'>
                       <p className="text-sm text-muted-foreground">Enter the percentage each person should pay. Percentages must add up to 100%.</p>
                      {members.map(member => (
                          <div key={member.id} className="grid grid-cols-3 items-center gap-2">
                              <Label htmlFor={`custom-percentage-${member.id}`} className="truncate col-span-1">{member.name}</Label>
                              <div className='relative col-span-2'>
                                  <Input
                                      id={`custom-percentage-${member.id}`}
                                      type="number"
                                      placeholder="0"
                                      value={customPercentages[member.id] || ''}
                                      onChange={(e) => handleCustomPercentageChange(member.id, e.target.value)}
                                      className="pr-6"
                                  />
                                  <span className="absolute inset-y-0 right-2 flex items-center text-muted-foreground text-sm">%</span>
                              </div>
                          </div>
                      ))}
                      <div className={cn(
                          "text-right text-sm font-medium",
                          remainingPercentage !== 0 ? 'text-destructive' : 'text-green-600'
                      )}>
                          {remainingPercentage.toFixed(2)}% remaining
                      </div>
                  </div>
              )}

              {splitType === 'custom' && (
                  <div className='space-y-4'>
                       <p className="text-sm text-muted-foreground">Enter how much each person should pay. The amounts must add up to ₹{group.expenses.toLocaleString()}.</p>
                      {members.map(member => (
                          <div key={member.id} className="grid grid-cols-3 items-center gap-2">
                              <Label htmlFor={`custom-amount-${member.id}`} className="truncate col-span-1">{member.name}</Label>
                               <div className='relative col-span-2'>
                                  <Input
                                      id={`custom-amount-${member.id}`}
                                      type="number"
                                      placeholder="0.00"
                                      value={customAmounts[member.id] || ''}
                                      onChange={(e) => handleCustomAmountChange(member.id, e.target.value)}
                                      className="pl-6"
                                  />
                                   <span className="absolute inset-y-0 left-2 flex items-center text-muted-foreground text-sm">₹</span>
                              </div>
                          </div>
                      ))}
                      <div className={cn(
                          "text-right text-sm font-medium",
                          remainingAmount !== 0 ? 'text-destructive' : 'text-green-600'
                      )}>
                          ₹{remainingAmount.toFixed(2)} remaining
                      </div>
                  </div>
              )}
            </div>
          </ScrollArea>
          <DialogFooter className="mt-4 pt-4 border-t">
            <Button type="submit">Split Expenses</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
