const birth = Date.parse(new Date('2 June 2004 18:53 GMT +7').toString());
const ms = Date.parse(Date()) - birth;
export const age = ms / 1000 / 60 / 60 / 24 / 365;
