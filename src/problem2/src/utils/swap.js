import BigNumber from "bignumber.js";
import { DECIMAL } from "./constants";

export const swapToken = (tokenFrom, tokenTo, amountTokenFrom) => {
    if (amountTokenFrom === '0') {
        return 0;
    }

    const priceFrom = tokenFrom?.price || 0;
    const priceTo = tokenTo?.price || 0;

    let usdTokenFrom = new BigNumber(amountTokenFrom).multipliedBy(priceFrom);
    let amountTokenTo = new BigNumber(0);
    if (usdTokenFrom.isGreaterThan(Number.MAX_SAFE_INTEGER)) {
        amountTokenTo = usdTokenFrom.dividedBy(priceTo);
        if (amountTokenTo.decimalPlaces() > DECIMAL) {
            amountTokenTo = amountTokenTo.toFixed(DECIMAL);
        }
        return amountTokenTo.toString();
    } else {
        amountTokenTo = usdTokenFrom.dividedBy(priceTo);
        amountTokenTo = amountTokenTo.toFixed(DECIMAL).toString();
        return amountTokenTo;
    }
}