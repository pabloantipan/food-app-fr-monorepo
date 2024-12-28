import { CapitalizeFirstLetterPipe } from "./capitalize.pipe";

describe('CapitalizeFirstLetterPipe', () => {
  it('create an instance', () => {
    const pipe = new CapitalizeFirstLetterPipe();
    expect(pipe).toBeTruthy();
  });
});
