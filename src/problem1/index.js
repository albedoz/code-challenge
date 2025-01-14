var validateNumber = function(n) {
    const isNotNumber = typeof n !== "number" || isNaN(n) || !Number.isInteger(n);
    return !isNotNumber;
}

var sum_to_n_a = function(n) {
    if (!validateNumber(n)) {
        return 0
    }

    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum = sum + i;
    }
    return sum;
};

var sum_to_n_b = function(n) {
    if (!validateNumber(n)) {
        return 0
    }

    if (n < 1) {
        return 0;
    }
    return (n * (n + 1)) / 2;
};

var sum_to_n_c = function(n) {
    if (!validateNumber(n)) {
        return 0
    }

    if (n < 1) {
        return 0;
    }

    if (n === 1) {
        return 1;
    }

    return n + sum_to_n_c(n - 1);
};


var test = function() {
    const functionTest = [
        sum_to_n_a,
        sum_to_n_b,
        sum_to_n_c
    ]

    const testCases = [
        { input: 1, expected: 1 },
        { input: 5, expected: 15 },
        { input: 10, expected: 55 },
        { input: 0, expected: 0 },
        { input: -1, expected: 0 },
        { input: -100, expected: 0 },
        { input: 100, expected: 5050 },
        { input: 1000, expected: 500500 },
        { input: '10', expected: 0 },
        { input: 'abc', expected: 0 },
        { input: null, expected: 0 },
        { input: undefined, expected: 0 },
    ];
    functionTest.forEach((fn) => {
        testCases.forEach(({ input, expected }, index) => {
            const result = fn(input);
            const pass = Object.is(result, expected);
            console.log(
                `Test #${index + 1}: ${fn.name}(${input}) = ${result} | ${
                    pass ? 'PASS' : 'FAIL'
                } (Expected: ${expected})`
            );
        });
        console.log("===============================================")
    })
    
}

test()