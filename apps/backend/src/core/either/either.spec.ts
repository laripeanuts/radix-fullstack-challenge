import { Either, left, right } from './either.';

function doSomeThing(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(1308);
  } else {
    return left('Error left');
  }
}

describe('Either', () => {
  it('should result right side success', () => {
    const result = doSomeThing(true);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
  });

  it('should result left side error', () => {
    const result = doSomeThing(false);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
  });
});
