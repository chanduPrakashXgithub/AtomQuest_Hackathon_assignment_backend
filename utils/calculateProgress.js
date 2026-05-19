const calculateProgress = (uomType, target, achievement) => {
    if (uomType === "min") {
        return (achievement / target) * 100;
    }

    if (uomType === "max") {
        return (target / achievement) * 100;
    }

    if (uomType === "zero") {
        return achievement === 0 ? 100 : 0;
    }

    return 0;
};

module.exports = calculateProgress;