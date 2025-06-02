function stringToEnumConverter(enumType) {
    return {
        fromAttribute: (val) => enumType[val],
        toAttribute: (val) => enumType[val]
    };
}

export { stringToEnumConverter as s };
//# sourceMappingURL=enumConverter-24.2.js.map
