
'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/hooks/use-app-store";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, UserPlus, Copy, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { Group } from "@/hooks/use-app-store";
import { SplitExpenseDialog } from "@/components/dashboard/split-expense-dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function GroupsPage() {
    const { groups } = useAppStore();
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Groups</h1>
                    <p className="text-muted-foreground">Manage your shared expense groups.</p>
                </div>
                <div className="flex gap-2">
                    <JoinGroupDialog />
                    <CreateGroupDialog />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map(group => (
                    <GroupCard key={group.name} group={group} />
                ))}
            </div>
        </div>
    )
}

function GroupCard({ group }: { group: Group }) {
    const { toast } = useToast();
    const { removeGroup, addNotification } = useAppStore();

    const handleCopy = () => {
        navigator.clipboard.writeText(group.code);
        toast({
            title: "Copied!",
            description: "Invite code copied to clipboard.",
        });
    };

    const handleRemove = () => {
        removeGroup(group.name);
        toast({
            title: "Group Removed",
            description: `The group "${group.name}" has been removed.`,
        });
        addNotification({
            id: Date.now().toString(),
            message: `You removed the group: "${group.name}"`,
            read: false,
        });
    }
    
    return (
        <Card className="overflow-hidden flex flex-col">
            <CardHeader className="p-0">
                <Image src={group.image} alt={group.name} width={600} height={400} className="object-cover h-40 w-full" data-ai-hint={group['data-ai-hint']} />
                <div className="p-6 pb-2">
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="font-headline">{group.name}</CardTitle>
                            <CardDescription className="pt-2 h-10">{group.description}</CardDescription>
                        </div>
                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Trash2 className="h-5 w-5 text-destructive" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the group
                                    and all associated expenses and debts.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleRemove}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow p-6 pt-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Members: <strong>{group.members.length}</strong></span>
                    <span>Expenses: <strong>₹{group.expenses.toLocaleString()}</strong></span>
                </div>
                <div className="mt-4">
                    <Label htmlFor={`invite-code-${group.name}`} className="text-xs">Invite Code</Label>
                    <div className="flex items-center gap-2">
                        <Input id={`invite-code-${group.name}`} readOnly value={group.code} className="h-8"/>
                        <Button size="icon" variant="outline" className="h-8 w-8" onClick={handleCopy}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="bg-muted/50 p-4">
                 <SplitExpenseDialog group={group}>
                    <Button className="w-full">View Details & Split</Button>
                </SplitExpenseDialog>
            </CardFooter>
        </Card>
    );
}

function CreateGroupDialog() {
    const { createGroup, addNotification, user } = useAppStore();
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!name.trim() || !description.trim()) {
            toast({
                title: "Validation Error",
                description: "Group name and description are required.",
                variant: "destructive"
            })
            return;
        }

        const newGroup: Group = { 
            name, 
            description,
            members: user ? [{id: user.email, name: user.name}] : [],
            expenses: 0,
            image: "https://placehold.co/600x400.png",
            'data-ai-hint': 'group fun',
            code: Math.random().toString(36).substring(2, 8).toUpperCase() 
        }

        createGroup(newGroup);

        addNotification({
            id: Date.now().toString(),
            message: `You created the group: "${name}"`,
            read: false,
        });

        toast({
            title: "Group Created!",
            description: `The group "${name}" has been successfully created.`,
        });

        setName('');
        setDescription('');
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Create Group
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create a New Group</DialogTitle>
                        <DialogDescription>Give your group a name and description to get started.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="space-y-2">
                            <Label htmlFor="group-name">Group Name</Label>
                            <Input id="group-name" placeholder="e.g., Road Trip Crew" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="group-description">Description</Label>
                            <Textarea id="group-description" placeholder="A short description of your group." value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Create Group</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

function JoinGroupDialog() {
    const { toast } = useToast();
    const { joinGroup, addNotification } = useAppStore();
    const [code, setCode] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!code.trim()) {
             toast({
                title: "Validation Error",
                description: "Invite code is required.",
                variant: "destructive"
            });
            return;
        }
        
        const result = joinGroup(code);

        if (result.success) {
            toast({
                title: "Success!",
                description: result.message,
            });
            addNotification({
                id: Date.now().toString(),
                message: result.message,
                read: false,
            });
            setCode('');
            setIsOpen(false);
        } else {
             toast({
                title: "Failed to Join",
                description: result.message,
                variant: "destructive"
            });
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <UserPlus className="mr-2 h-4 w-4" /> Join Group
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Join an Existing Group</DialogTitle>
                        <DialogDescription>Enter the invite code to join a group.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="space-y-2">
                            <Label htmlFor="invite-code">Invite Code</Label>
                            <Input id="invite-code" placeholder="Enter code..." value={code} onChange={e => setCode(e.target.value.toUpperCase())} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Join Group</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
    

    

    

