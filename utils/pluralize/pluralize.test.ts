import pluralize from './pluralize';

describe('utils/pluralize', () => {
  it('should return singular value, when count is lte 1', () => {
    expect(pluralize('cucumber', 0)).toBe('cucumber');
    expect(pluralize('cucumber', 1)).toBe('cucumber');
  });

  it('should return plural value, when count is gt 1', () => {
    expect(pluralize('cucumber', 2)).toBe('cucumbers');
  });
});
