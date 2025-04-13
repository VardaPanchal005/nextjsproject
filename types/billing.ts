export enum PackId {
    SMALL="SMALL",
    MEDIUM="MEDIUM",
    LARGE="LARGE"
}

export type CreditsPack={
    id:PackId;
    name:string;
    label:string;
    credits:number;
    price:number;
}

export const CreditsPack:CreditsPack[]=[
    {
        id:PackId.SMALL,
        name:"Small Pack",
        label:"1000 credits",
        credits:1000,
        price:999,
    },
    {
        id:PackId.MEDIUM,
        name:"Medium Pack",
        label:"5000 credits",
        credits:5000,
        price:3999,
    },
    {
        id:PackId.LARGE,
        name:"Large Pack",
        label:"10000 credits",
        credits:10000,
        price:6999,
    },
];

export const getCreditsPack=(id:PackId) =>
    CreditsPack.find((p)=> p.id==id)