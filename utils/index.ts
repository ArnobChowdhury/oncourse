function shortendDid(did: string) {
  const firstThree = did.slice(0, 3);
  const len = did.length - 3;
  const lastThree = did.slice(len);
  return `${firstThree}...${lastThree}`;
}

export { shortendDid };
