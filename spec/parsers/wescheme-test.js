/* globals describe it expect beforeEach */

import Parser from '../../src/parsers/wescheme';

describe("The WeScheme Parser", function() {
  beforeEach(function() {
    this.parser = new Parser();
  });

  it("should set the appropriate data type for literals", function() {
    expect(this.parser.parse('#t').rootNodes[0].dataType).toBe('boolean');
    expect(this.parser.parse('1').rootNodes[0].dataType).toBe('number');
    expect(this.parser.parse('"hello"').rootNodes[0].dataType).toBe('string');
    expect(this.parser.parse('#\\m').rootNodes[0].dataType).toBe('char');
    expect(this.parser.parse('foo').rootNodes[0].dataType).toBe('symbol');
  });

  it("should treat booleans expression like regular expressions", function() {
    let ast = this.parser.parse('(or #t #f)');
    expect(ast.rootNodes[0].type).toBe('expression');
    ast = this.parser.parse('(and #t #f)');
    expect(ast.rootNodes[0].type).toBe('expression');
  });

  it("should convert callExpresssions to expressions", function() {
    let ast = this.parser.parse('(sum 1 2 3)');
    expect(ast.rootNodes[0].type).toBe('expression');
  });

  describe("when setting aria-labels", function() {
    it("should make symbols, numbers, and booleans be set to themselves", function() {
      expect(this.parser.parse('1').rootNodes[0].options['aria-label']).toBe('1');
      expect(this.parser.parse('symbol').rootNodes[0].options['aria-label']).toBe('symbol');
      expect(this.parser.parse('#t').rootNodes[0].options['aria-label']).toBe('#t');
    });

    it("should make string values be set to 'string '+the contents of the string", function() {
      expect(this.parser.parse('"hello"').rootNodes[0].options['aria-label'])
                 .toBe('string hello');
    });

    it("should make expression (print 'hello') into 'print expression, 1 argument'", function() {
      expect(this.parser.parse('(print "hello")').rootNodes[0].options['aria-label'])
                 .toBe('print expression, 1 argument');
      expect(this.parser.parse('(print "hello" "world")').rootNodes[0].options['aria-label'])
                 .toBe('print expression, 2 arguments');
    });
  });
});
