
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

export type Transaction = {
    id: string;
    description: string;
    category: string;
    group: string;
    amount: number;
    date: string;
}

export type GroupMember = {
    id: string; // email
    name: string;
}

export type Group = {
    name: string;
    description: string;
    members: GroupMember[];
    expenses: number;
    image: string;
    'data-ai-hint': string;
    code: string;
}

export type Notification = {
    id: string;
    message: string;
    read: boolean;
}

export type Debt = {
    id: string;
    from: GroupMember;
    to: GroupMember;
    amount: number;
    groupName: string;
}

export type User = {
    name: string;
    email: string;
    passwordHash: string; // In a real app, never store plain text passwords
}

type SplitExpensePayload = {
  splitType: 'equally' | 'custom' | 'percentage';
  customAmounts: Record<string, number>; // memberId -> amount
  customPercentages: Record<string, number>; // memberId -> percentage
}

type AppState = {
    isAuthenticated: boolean;
    user: User | null;
    registeredUsers: User[];
    transactions: Transaction[];
    groups: Group[];
    notifications: Notification[];
    debts: Debt[];
    register: (name: string, email: string, pass: string) => { success: boolean, message: string };
    login: (email: string, pass: string) => { success: boolean; message: string };
    logout: () => void;
    addTransaction: (transaction: Transaction) => void;
    createGroup: (group: Group) => void;
    joinGroup: (code: string) => { success: boolean, message: string };
    removeGroup: (groupName: string) => void;
    addNotification: (notification: Notification) => void;
    markAllAsRead: () => void;
    settleDebt: (debtId: string) => void;
    splitExpense: (groupName: string, payload: SplitExpensePayload) => void;
}

const defaultUser: User = { name: 'Demo User', email: 'user@example.com', passwordHash: 'password123' };

const initialTransactions: Transaction[] = [
    { id: '1', description: "Grocery Shopping", category: "Groceries", group: "Apartment Bills", amount: -6048.0, date: "2024-05-27" },
    { id: '2', description: "Monthly Rent", category: "Rent", group: "Apartment Bills", amount: -96000.0, date: "2024-05-25" },
    { id: '3', description: "Dinner with friends", category: "Dining", group: "Trip to Bali", amount: -4336.0, date: "2024-05-24" },
    { id: '4', description: "Movie Tickets", category: "Entertainment", group: "Personal", amount: -2560.0, date: "2024-05-23" },
    { id: '5', description: "Gas Bill", category: "Utilities", group: "Apartment Bills", amount: -7080.0, date: "2024-05-22" },
    { id: '6', description: "Flight Tickets", category: "Travel", group: "Trip to Bali", amount: -36000.0, date: "2024-05-20" },
    { id: '7', description: "Coffee", category: "Dining", group: "Personal", amount: -360.0, date: "2024-05-19" },
    { id: '8', description: "New Backpack", category: "Shopping", group: "Trip to Bali", amount: -9600.0, date: "2024-05-18" },
    { id: '9', description: "Office Lunch", category: "Dining", group: "Work Buddies", amount: -1500.0, date: "2024-05-28" },
    { id: '10', description: "Project Supplies", category: "Shopping", group: "Side Hustle", amount: -8000.0, date: "2024-05-29" },
];

const initialGroups: Group[] = [
    { name: "Trip to Bali", description: "Planning our annual vacation!", members: [{id: 'jane@example.com', name: 'Jane S.'}, {id: 'mike@example.com', name: 'Mike W.'}, {id: defaultUser.email, name: defaultUser.name}], expenses: 49936, image: `https://placehold.co/600x400.png`, 'data-ai-hint': 'travel beach', code: "BALI2024" },
    { name: "Apartment Bills", description: "Monthly shared expenses for our apartment.", members: [{id: defaultUser.email, name: defaultUser.name}, {id: 'alex@example.com', name: 'Alex J.'}], expenses: 109128, image: `https://placehold.co/600x400.png`, 'data-ai-hint': 'apartment city', code: "HOME5RA" },
    { name: "Work Buddies", description: "For team lunches and events.", members: [{id: 'sara@example.com', name: 'Sara K.'}, {id: defaultUser.email, name: defaultUser.name}], expenses: 1500, image: `https://placehold.co/600x400.png`, 'data-ai-hint': 'office team', code: "WRKBUD" },
    { name: "Side Hustle", description: "Tracking costs for our freelance project.", members: [{id: 'leo@example.com', name: 'Leo P.'}, {id: defaultUser.email, name: 'Demo User'}], expenses: 8000, image: `https://placehold.co/600x400.png`, 'data-ai-hint': 'freelance project', code: "HUSTLE1" },
];

const initialNotifications: Notification[] = [
    { id: '1', message: 'New expense in "Trip to Bali"', read: false },
    { id: '2', message: 'John Doe settled up.', read: true },
    { id: '3', message: 'You were added to "Apartment Bills"', read: false }
]

const initialDebts: Debt[] = [
    { id: 'debt1', from: {id: 'user@example.com', name: 'Demo User'}, to: {id: 'jane@example.com', name: 'Jane S.'}, amount: 3200, groupName: 'Trip to Bali' },
    { id: 'debt2', from: {id: 'user@example.com', name: 'Demo User'}, to: {id: 'alex@example.com', name: 'Alex J.'}, amount: 4220, groupName: 'Apartment Bills' },
    { id: 'debt3', from: {id: 'mike@example.com', name: 'Mike W.'}, to: {id: 'user@example.com', name: 'Demo User'}, amount: 12550, groupName: 'Trip to Bali' },
];

const initialState = {
  isAuthenticated: false,
  user: null,
  registeredUsers: [defaultUser], // Start with the demo user
  transactions: [],
  groups: [],
  notifications: [],
  debts: [],
};

const storageName = 'budget-zen-storage';

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
        ...initialState,
      register: (name, email, password) => {
        const { registeredUsers } = get();
        if (registeredUsers.some(u => u.email === email)) {
            return { success: false, message: 'User with this email already exists.' };
        }
         if (/\s/.test(password)) {
            return { success: false, message: 'Password cannot contain spaces.' };
        }
        // In a real app, you would hash the password.
        const newUser = { name, email, passwordHash: password };
        set(state => ({ registeredUsers: [...state.registeredUsers, newUser] }));
        return { success: true, message: 'Registration successful!' };
      },
      login: (email, password) => {
        const { registeredUsers } = get();
        const userExists = registeredUsers.find(u => u.email === email);

        if (!userExists) {
            return { success: false, message: "No account found with this email. Please sign up." };
        }

        if (userExists.passwordHash !== password) {
             return { success: false, message: "Invalid password. Please try again." };
        }
        
        set({ 
            isAuthenticated: true, 
            user: { name: userExists.name, email: userExists.email, passwordHash: userExists.passwordHash },
            transactions: initialTransactions,
            groups: initialGroups,
            notifications: initialNotifications,
            debts: initialDebts,
        });
        return { success: true, message: "Login successful!"};
      },
      logout: () => {
          localStorage.removeItem(storageName);
          set(initialState)
      },
      addTransaction: (transaction) => set((state) => ({ transactions: [transaction, ...state.transactions] })),
      createGroup: (group) => set((state) => ({ groups: [group, ...state.groups] })),
      joinGroup: (code) => {
        const { user, groups } = get();
        if (!user) {
            return { success: false, message: 'You must be logged in to join a group.' };
        }

        const groupIndex = groups.findIndex(g => g.code === code);
        if (groupIndex === -1) {
            return { success: false, message: 'Invalid group code.' };
        }

        const nextGroups = [...groups];
        const groupToJoin = {...nextGroups[groupIndex]};

        if (groupToJoin.members.some(member => member.id === user.id)) {
            return { success: false, message: `You are already a member of "${groupToJoin.name}".` };
        }

        groupToJoin.members = [...groupToJoin.members, { id: user.email, name: user.name }];
        
        nextGroups[groupIndex] = groupToJoin;

        set({ groups: nextGroups });
        return { success: true, message: `You have joined the group: "${groupToJoin.name}"` };
      },
      removeGroup: (groupName: string) => {
        set((state) => ({
            groups: state.groups.filter(g => g.name !== groupName),
            transactions: state.transactions.filter(t => t.group !== groupName),
            debts: state.debts.filter(d => d.groupName !== groupName),
        }))
      },
      addNotification: (notification) => set((state) => ({ notifications: [notification, ...state.notifications] })),
      markAllAsRead: () => set((state) => ({
          notifications: state.notifications.map(n => ({...n, read: true}))
      })),
      settleDebt: (debtId) => set((state) => ({
        debts: state.debts.filter(d => d.id !== debtId)
      })),
      splitExpense: (groupName, payload) => {
        const { groups, debts, user } = get();
        const group = groups.find(g => g.name === groupName);
        if (!group || !user) return;
        
        const payer = user;

        let newDebtsForGroup: Debt[] = [];
        
        if (payload.splitType === 'equally') {
            const amountPerPerson = group.expenses / group.members.length;
            group.members.forEach(member => {
                if(member.id === payer.id) return;
                const newDebt: Debt = {
                    id: `debt-${Date.now()}-${member.id}`,
                    from: member,
                    to: payer,
                    amount: amountPerPerson,
                    groupName: group.name
                };
                newDebtsForGroup.push(newDebt);
            });
        } else if (payload.splitType === 'custom') {
            Object.entries(payload.customAmounts).forEach(([memberId, amount]) => {
                const memberOwes = group.members.find(m => m.id === memberId);
                if (memberOwes && amount > 0) {
                     if (memberOwes.id === payer.id) return;
                     const newDebt: Debt = {
                        id: `debt-${Date.now()}-${memberOwes.id}`,
                        from: memberOwes,
                        to: payer,
                        amount: amount,
                        groupName: group.name
                    };
                    newDebtsForGroup.push(newDebt);
                }
            });
        } else if (payload.splitType === 'percentage') {
            Object.entries(payload.customPercentages).forEach(([memberId, percentage]) => {
                const memberOwes = group.members.find(m => m.id === memberId);
                if (memberOwes && percentage > 0) {
                    if (memberOwes.id === payer.id) return;
                    const amount = (group.expenses * percentage) / 100;
                    const newDebt: Debt = {
                        id: `debt-${Date.now()}-${memberOwes.id}`,
                        from: memberOwes,
                        to: payer,
                        amount: amount,
                        groupName: group.name
                    };
                    newDebtsForGroup.push(newDebt);
                }
            });
        }
        
        const otherGroupsDebts = debts.filter(d => d.groupName !== groupName);
        
        set({ debts: [...otherGroupsDebts, ...newDebtsForGroup] });
      }
    }),
    {
      name: storageName, 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
