import { SplitByColumnPipe } from './split-by-column.pipe';

describe('Pipe: SplitByColumnPipe', () => {

  let pipe: SplitByColumnPipe;
  let testArray: String[];

  beforeEach(() => {
    pipe = new SplitByColumnPipe();
    testArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('split array into 1 cols display : Default col value', () => {
    const expectedArray = [
      ['A'],
      ['B'],
      ['C'],
      ['D'],
      ['E'],
      ['F'],
      ['G'],
      ['H'],
      ['I'],
      ['J'],
      ['K'],
      ['L'],
      ['M']
    ];
    expect(pipe.transform(testArray)).toEqual(expectedArray);
  });
  it('split array into 1 cols display', () => {
    const expectedArray = [
      ['A'],
      ['B'],
      ['C'],
      ['D'],
      ['E'],
      ['F'],
      ['G'],
      ['H'],
      ['I'],
      ['J'],
      ['K'],
      ['L'],
      ['M']
    ];
    expect(pipe.transform(testArray, 1)).toEqual(expectedArray);
  });
  it('split array into 2 cols display', () => {
    const expectedArray = [
      ['A', 'B'],
      ['C', 'D'],
      ['E', 'F'],
      ['G', 'H'],
      ['I', 'J'],
      ['K', 'L'],
      ['M']
    ];
    expect(pipe.transform(testArray, 2)).toEqual(expectedArray);
  });

  it('split array into 3 cols display', () => {
    const expectedArray = [
      ['A', 'B', 'C'],
      ['D', 'E', 'F'],
      ['G', 'H', 'I'],
      ['J', 'K', 'L'],
      ['M']
    ];
    expect(pipe.transform(testArray, 3)).toEqual(expectedArray);
  });

});
