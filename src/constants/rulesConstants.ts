export interface Rule {
  id: string;
  label: string;
  value: number;
  color: string;
}

export interface RulesWithDetails {
  [key: string]: Rule[];
}

export const rulesWithDetails: RulesWithDetails = {
  "50-30-20-rule": [
    { id: "Essentials", label: "Essentials", value: 50, color: "#61cdbb" },
    { id: "Wants", label: "Wants", value: 30, color: "#97e3d9" },
    {
      id: "Retirement Savings",
      label: "Retirement Savings",
      value: 20,
      color: "#97e3r5",
    },
  ],
  "my-rule": [
    { id: "Essentials", label: "Essentials", value: 40, color: "#61cdbb" },
    { id: "Wants", label: "Wants", value: 10, color: "#97e3d9" },
    {
      id: "Savings",
      label: "Savings",
      value: 50,
      color: "#97e3r5",
    },
  ],
};

export const rules = ["50-30-20-rule", "my-rule"];
