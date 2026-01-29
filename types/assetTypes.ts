export interface Asset {
  name: string;
  id: string;
  share: string;
  shareColor: string;
  valuation: string;
  volume: string;
  marketValue: string;
  loan: string;
  chain: string;
  issuer: string;
  custodian: string;
  oracle: string;
  date: string;
  loanToValue: string;
  liquidationThreshold: string;
  healthFactor: string;
  interestRate: string;
  startDate: string;
  lastPaymentDate: string;
  nextPaymentDate: string;
  termMonths: number;
  balance: string;
  riskLevel: string;
  collateralStatus: string;
  liquidationBonus: string;
  reserveFactor: string;
  utilizationRate: string;
  eModeCategory: string;
  ownerName: string;
  walletAddress: string;
  institution: string;
  dateAdded: string;
  lastUpdated: string;
  auditStatus: string;
  documentLink: string;
  notes: string;
}

export interface Category {
  id: string;
  name: string;
  assets: Asset[];
}

export const initialCategories: Category[] = [
  {
    id: "1",
    name: "Crypto",
    assets: [
      {
        name: "wBTC",
        id: "23524588",
        share: "-",
        shareColor: "text-black",
        valuation: "-",
        volume: "0, 1",
        marketValue: "$50,000",
        loan: "$120,000",
        chain: "Ethereum",
        issuer: "Bitgo",
        custodian: "Zodia Custody",
        oracle: "Chainlink",
        date: "Onchain",
        loanToValue: "80%",
        liquidationThreshold: "85",
        healthFactor: "1,14",
        interestRate: "6%",
        startDate: "01/01/2025",
        lastPaymentDate: "01/01/2025",
        nextPaymentDate: "01/01/2025",
        termMonths: 4,
        balance: "$40,000",
        riskLevel: "Low / Medium / High",
        collateralStatus: "Active / In Liquidation / Closed",
        liquidationBonus: "",
        reserveFactor: "",
        utilizationRate: "",
        eModeCategory: "",
        ownerName: "",
        walletAddress: "",
        institution: "",
        dateAdded: "",
        lastUpdated: "",
        auditStatus: "",
        documentLink: "",
        notes: "",
      },
    ],
  },
  {
    id: "2",
    name: "Bonds",
    assets: [
      {
        name: "CC",
        id: "24572682",
        share: "-",
        shareColor: "text-black",
        valuation: "-",
        volume: "1000",
        marketValue: "$30,000",
        loan: "$30,000",
        chain: "Canton Network",
        issuer: "RWS",
        custodian: "Zodia Custody",
        oracle: "Chainlink",
        date: "Onchain",
        loanToValue: "80%",
        liquidationThreshold: "85",
        healthFactor: "1",
        interestRate: "7%",
        startDate: "01/01/2025",
        lastPaymentDate: "01/01/2025",
        nextPaymentDate: "01/01/2025",
        termMonths: 10,
        balance: "$25,000",
        riskLevel: "Low / Medium / High",
        collateralStatus: "Active / In Liquidation / Closed",
        liquidationBonus: "",
        reserveFactor: "",
        utilizationRate: "",
        eModeCategory: "",
        ownerName: "",
        walletAddress: "",
        institution: "",
        dateAdded: "",
        lastUpdated: "",
        auditStatus: "",
        documentLink: "",
        notes: "",
      },
    ],
  },
  {
    id: "3",
    name: "Real Estate",
    assets: [
      {
        name: "Real Estate 1",
        id: "98246278",
        share: "75%",
        shareColor: "text-green-500",
        valuation: "120%",
        volume: "5%",
        marketValue: "$50,000",
        loan: "$3,000",
        chain: "Ethereum",
        issuer: "Bitgo",
        custodian: "Zodia Custody",
        oracle: "Chainlink",
        date: "Onchain",
        loanToValue: "50%",
        liquidationThreshold: "70",
        healthFactor: "1,6",
        interestRate: "9%",
        startDate: "01/01/2025",
        lastPaymentDate: "01/01/2025",
        nextPaymentDate: "01/01/2025",
        termMonths: 120,
        balance: "$12,000",
        riskLevel: "Low / Medium / High",
        collateralStatus: "Active / In Liquidation / Closed",
        liquidationBonus: "",
        reserveFactor: "",
        utilizationRate: "",
        eModeCategory: "",
        ownerName: "",
        walletAddress: "",
        institution: "",
        dateAdded: "",
        lastUpdated: "",
        auditStatus: "",
        documentLink: "",
        notes: "",
      },
      {
        name: "Real Estate 2",
        id: "98246277",
        share: "56%",
        shareColor: "text-yellow-500",
        valuation: "120%",
        volume: "1000",
        marketValue: "$50,000",
        loan: "$3,000",
        chain: "Canton Network",
        issuer: "RWS",
        custodian: "Zodia Custody",
        oracle: "Chainlink",
        date: "Onchain",
        loanToValue: "50%",
        liquidationThreshold: "70",
        healthFactor: "1,6",
        interestRate: "9%",
        startDate: "01/01/2025",
        lastPaymentDate: "01/01/2025",
        nextPaymentDate: "01/01/2025",
        termMonths: 120,
        balance: "$12,000",
        riskLevel: "Low / Medium / High",
        collateralStatus: "Active / In Liquidation / Closed",
        liquidationBonus: "",
        reserveFactor: "",
        utilizationRate: "",
        eModeCategory: "",
        ownerName: "",
        walletAddress: "",
        institution: "",
        dateAdded: "",
        lastUpdated: "",
        auditStatus: "",
        documentLink: "",
        notes: "",
      },
      {
        name: "Real Estate 3",
        id: "98246276",
        share: "43%",
        shareColor: "text-yellow-600",
        valuation: "120%",
        volume: "0.1",
        marketValue: "$50,000",
        loan: "$3,000",
        chain: "Ethereum",
        issuer: "RWS",
        custodian: "Zodia Custody",
        oracle: "Chainlink",
        date: "Onchain",
        loanToValue: "50%",
        liquidationThreshold: "70",
        healthFactor: "1,6",
        interestRate: "9%",
        startDate: "01/01/2025",
        lastPaymentDate: "01/01/2025",
        nextPaymentDate: "01/01/2025",
        termMonths: 120,
        balance: "$12,000",
        riskLevel: "Low / Medium / High",
        collateralStatus: "Active / In Liquidation / Closed",
        liquidationBonus: "",
        reserveFactor: "",
        utilizationRate: "",
        eModeCategory: "",
        ownerName: "",
        walletAddress: "",
        institution: "",
        dateAdded: "",
        lastUpdated: "",
        auditStatus: "",
        documentLink: "",
        notes: "",
      },
      {
        name: "Real Estate 4",
        id: "98246275",
        share: "20%",
        shareColor: "text-red-500",
        valuation: "120%",
        volume: "1",
        marketValue: "$50,000",
        loan: "$3,000",
        chain: "Ethereum",
        issuer: "RWS",
        custodian: "Zodia Custody",
        oracle: "Chainlink",
        date: "Onchain",
        loanToValue: "50%",
        liquidationThreshold: "70",
        healthFactor: "1,6",
        interestRate: "9%",
        startDate: "01/01/2025",
        lastPaymentDate: "01/01/2025",
        nextPaymentDate: "01/01/2025",
        termMonths: 120,
        balance: "$12,000",
        riskLevel: "Low / Medium / High",
        collateralStatus: "Active / In Liquidation / Closed",
        liquidationBonus: "",
        reserveFactor: "",
        utilizationRate: "",
        eModeCategory: "",
        ownerName: "",
        walletAddress: "",
        institution: "",
        dateAdded: "",
        lastUpdated: "",
        auditStatus: "",
        documentLink: "",
        notes: "",
      },
    ],
  },
];
