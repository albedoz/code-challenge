import React, { useMemo } from 'react';

interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
}
interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
}

interface BoxProps {

}

interface Props extends BoxProps {
    children: React.ReactNode;
}

interface WalletRowProps {
    amount: number;
    usdValue: number;
    formattedAmount: string;
}

const useWalletBalances = (): Array<WalletBalance> => {
    /**
     * This function should return an array of WalletBalance objects.
     */
    return [];
}
const usePrices = (): {
    [currency: string]: number;
} => {
    /**
     * This function should return an object where the keys are currency symbols and the values are the price of the currency in USD.
     */
    return {};
}

const WalletRow = (props: WalletRowProps) => {
    return (
        <div>
            <div>{props.amount}</div>
            <div>{props.formattedAmount}</div>
            <div>{props.usdValue}</div>
        </div>
    )
}

const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances() || [];
    const prices = usePrices() || {};

    const getPriority = (blockchain: string): number => {
        switch (blockchain) {
            case 'Osmosis':
                return 100
            case 'Ethereum':
                return 50
            case 'Arbitrum':
                return 30
            case 'Zilliqa':
                return 20
            case 'Neo':
                return 20
            default:
                return -99
        }
    }

    const formattedBalances = useMemo(() => {
        return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);
            return balancePriority > -99 && balance.amount > 0;
        }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
            const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            return leftPriority - rightPriority;
        }).map((balance: WalletBalance) => {
            return {
                ...balance,
                formatted: balance.amount.toFixed()
            }
        });
    }, [balances]);

    const rows = formattedBalances.map((balance: FormattedWalletBalance) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
            <WalletRow
                key={balance.currency}
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={balance.formatted}
            />
        )
    })

    return (
        <div {...rest}>
            {rows}
        </div>
    )
}