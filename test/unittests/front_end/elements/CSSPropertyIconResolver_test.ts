// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import {findIcon, getPhysicalFlexDirections, PhysicalFlexDirection, reverseDirection, rotateAlignContentIcon, rotateAlignItemsIcon, rotateFlexDirectionIcon, rotateJustifyContentIcon} from '../../../../front_end/elements/CSSPropertyIconResolver.js';

const {assert} = chai;

describe('CSSPropertyIconResolver', () => {
  function mapFromStyle(style: {[key: string]: string|undefined}) {
    const result = new Map();
    for (const key of Object.keys(style)) {
      result.set(key, style[key]);
    }
    return result;
  }


  it('can computed actual directions for row and column', () => {
    const tests = [
      {
        style: {
          'direction': 'ltr',
        },
        expected: {
          row: PhysicalFlexDirection.LEFT_TO_RIGHT,
          column: PhysicalFlexDirection.TOP_TO_BOTTOM,
          'row-reverse': PhysicalFlexDirection.RIGHT_TO_LEFT,
          'column-reverse': PhysicalFlexDirection.BOTTOM_TO_TOP,
        },
      },
      {
        style: {
          'direction': 'ltr',
          'writing-mode': 'vertical-rl',
        },
        expected: {
          row: PhysicalFlexDirection.TOP_TO_BOTTOM,
          column: PhysicalFlexDirection.RIGHT_TO_LEFT,
          'row-reverse': PhysicalFlexDirection.BOTTOM_TO_TOP,
          'column-reverse': PhysicalFlexDirection.LEFT_TO_RIGHT,
        },
      },
      {
        style: {
          'direction': 'ltr',
          'writing-mode': 'vertical-lr',
        },
        expected: {
          row: PhysicalFlexDirection.TOP_TO_BOTTOM,
          column: PhysicalFlexDirection.LEFT_TO_RIGHT,
          'row-reverse': PhysicalFlexDirection.BOTTOM_TO_TOP,
          'column-reverse': PhysicalFlexDirection.RIGHT_TO_LEFT,
        },
      },
      {
        style: {
          'direction': 'ltr',
          'writing-mode': 'tb',
        },
        expected: {
          row: PhysicalFlexDirection.TOP_TO_BOTTOM,
          column: PhysicalFlexDirection.RIGHT_TO_LEFT,
          'row-reverse': PhysicalFlexDirection.BOTTOM_TO_TOP,
          'column-reverse': PhysicalFlexDirection.LEFT_TO_RIGHT,
        },
      },
      {
        style: {
          'direction': 'ltr',
          'writing-mode': 'tb-rl',
        },
        expected: {
          row: PhysicalFlexDirection.TOP_TO_BOTTOM,
          column: PhysicalFlexDirection.RIGHT_TO_LEFT,
          'row-reverse': PhysicalFlexDirection.BOTTOM_TO_TOP,
          'column-reverse': PhysicalFlexDirection.LEFT_TO_RIGHT,
        },
      },
      {
        style: {
          'direction': 'rtl',
        },
        expected: {
          row: PhysicalFlexDirection.RIGHT_TO_LEFT,
          column: PhysicalFlexDirection.TOP_TO_BOTTOM,
          'row-reverse': PhysicalFlexDirection.LEFT_TO_RIGHT,
          'column-reverse': PhysicalFlexDirection.BOTTOM_TO_TOP,
        },
      },
      {
        style: {
          'direction': 'rtl',
          'writing-mode': 'vertical-rl',
        },
        expected: {
          row: PhysicalFlexDirection.BOTTOM_TO_TOP,
          column: PhysicalFlexDirection.RIGHT_TO_LEFT,
          'row-reverse': PhysicalFlexDirection.TOP_TO_BOTTOM,
          'column-reverse': PhysicalFlexDirection.LEFT_TO_RIGHT,
        },
      },
      {
        style: {
          'direction': 'rtl',
          'writing-mode': 'vertical-lr',
        },
        expected: {
          row: PhysicalFlexDirection.BOTTOM_TO_TOP,
          column: PhysicalFlexDirection.LEFT_TO_RIGHT,
          'row-reverse': PhysicalFlexDirection.TOP_TO_BOTTOM,
          'column-reverse': PhysicalFlexDirection.RIGHT_TO_LEFT,
        },
      },
      {
        style: {
          'direction': 'rtl',
          'writing-mode': 'tb',
        },
        expected: {
          row: PhysicalFlexDirection.BOTTOM_TO_TOP,
          column: PhysicalFlexDirection.RIGHT_TO_LEFT,
          'row-reverse': PhysicalFlexDirection.TOP_TO_BOTTOM,
          'column-reverse': PhysicalFlexDirection.LEFT_TO_RIGHT,
        },
      },
      {
        style: {
          'direction': 'rtl',
          'writing-mode': 'tb-rl',
        },
        expected: {
          row: PhysicalFlexDirection.BOTTOM_TO_TOP,
          column: PhysicalFlexDirection.RIGHT_TO_LEFT,
          'row-reverse': PhysicalFlexDirection.TOP_TO_BOTTOM,
          'column-reverse': PhysicalFlexDirection.LEFT_TO_RIGHT,
        },
      },
    ];

    for (const test of tests) {
      assert.deepEqual(
          getPhysicalFlexDirections(mapFromStyle(test.style)), test.expected,
          `Test ${JSON.stringify(test.style)} failed.`);
    }
  });

  it('can rotate the icon', () => {
    assert.deepEqual(rotateFlexDirectionIcon(PhysicalFlexDirection.LEFT_TO_RIGHT), {
      iconName: 'flex-direction-icon',
      rotate: -90,
      scaleX: -1,
      scaleY: 1,
    });
    assert.deepEqual(rotateFlexDirectionIcon(PhysicalFlexDirection.RIGHT_TO_LEFT), {
      iconName: 'flex-direction-icon',
      rotate: 90,
      scaleX: 1,
      scaleY: 1,
    });
    assert.deepEqual(rotateFlexDirectionIcon(PhysicalFlexDirection.TOP_TO_BOTTOM), {
      iconName: 'flex-direction-icon',
      rotate: 0,
      scaleX: 1,
      scaleY: 1,
    });
    assert.deepEqual(rotateFlexDirectionIcon(PhysicalFlexDirection.BOTTOM_TO_TOP), {
      iconName: 'flex-direction-icon',
      rotate: 0,
      scaleX: 1,
      scaleY: -1,
    });
  });

  it('can find an icon for flex-direction row', () => {
    const tests = [
      {
        style: {
          'direction': 'ltr',
        },
        expected: PhysicalFlexDirection.LEFT_TO_RIGHT,
      },
      {
        style: {
          'direction': 'ltr',
          'writing-mode': 'tb',
        },
        expected: PhysicalFlexDirection.TOP_TO_BOTTOM,
      },
      {
        style: {
          'direction': 'ltr',
          'writing-mode': 'vertical-lr',
        },
        expected: PhysicalFlexDirection.TOP_TO_BOTTOM,
      },
      {
        style: {
          'direction': 'ltr',
          'writing-mode': 'vertical-rl',
        },
        expected: PhysicalFlexDirection.TOP_TO_BOTTOM,
      },
      {
        style: {
          'direction': 'ltr',
          'writing-mode': 'tb-rl',
        },
        expected: PhysicalFlexDirection.TOP_TO_BOTTOM,
      },
      {
        style: {
          'direction': 'rtl',
        },
        expected: PhysicalFlexDirection.RIGHT_TO_LEFT,
      },
      {
        style: {
          'direction': 'rtl',
          'writing-mode': 'tb',
        },
        expected: PhysicalFlexDirection.BOTTOM_TO_TOP,
      },
      {
        style: {
          'direction': 'rtl',
          'writing-mode': 'vertical-lr',
        },
        expected: PhysicalFlexDirection.BOTTOM_TO_TOP,
      },
      {
        style: {
          'direction': 'rtl',
          'writing-mode': 'vertical-rl',
        },
        expected: PhysicalFlexDirection.BOTTOM_TO_TOP,
      },
      {
        style: {
          'direction': 'rtl',
          'writing-mode': 'tb-rl',
        },
        expected: PhysicalFlexDirection.BOTTOM_TO_TOP,
      },
    ];
    for (const test of tests) {
      assert.deepEqual(
          findIcon('flex-direction: row', mapFromStyle(test.style)), rotateFlexDirectionIcon(test.expected),
          `Test 'flex-direction: row'(${JSON.stringify(test.style)}) failed.`);

      assert.deepEqual(
          findIcon('flex-direction: row-reverse', mapFromStyle(test.style)),
          rotateFlexDirectionIcon(reverseDirection(test.expected)),
          `Test 'flex-direction: row-reverse'(${JSON.stringify(test.style)}) failed.`);
    }
  });

  it('can find an icon for flex-direction: column and column-reverse', () => {
    const tests = [
      {
        style: {
          'direction': 'ltr',
        },
        expected: PhysicalFlexDirection.TOP_TO_BOTTOM,
      },
      {
        style: {
          'writing-mode': 'vertical-rl',
        },
        expected: PhysicalFlexDirection.RIGHT_TO_LEFT,
      },
      {
        style: {
          'writing-mode': 'vertical-lr',
        },
        expected: PhysicalFlexDirection.LEFT_TO_RIGHT,
      },
    ];

    for (const test of tests) {
      assert.deepEqual(
          findIcon('flex-direction: column', mapFromStyle(test.style)), rotateFlexDirectionIcon(test.expected),
          `Test 'flex-direction: column'(${JSON.stringify(test.style)}) failed.`);

      assert.deepEqual(
          findIcon('flex-direction: column-reverse', mapFromStyle(test.style)),
          rotateFlexDirectionIcon(reverseDirection(test.expected)),
          `Test 'flex-direction: column-reverse'(${JSON.stringify(test.style)}) failed.`);
    }
  });

  it('can rotate an icon for align-content', () => {
    const iconName = 'iconName';
    assert.deepEqual(rotateAlignContentIcon(iconName, PhysicalFlexDirection.LEFT_TO_RIGHT), {
      iconName,
      rotate: -90,
      scaleX: 1,
      scaleY: 1,
    });
    assert.deepEqual(rotateAlignContentIcon(iconName, PhysicalFlexDirection.RIGHT_TO_LEFT), {
      iconName,
      rotate: 90,
      scaleX: 1,
      scaleY: 1,
    });
    assert.deepEqual(rotateAlignContentIcon(iconName, PhysicalFlexDirection.TOP_TO_BOTTOM), {
      iconName,
      rotate: 0,
      scaleX: 1,
      scaleY: 1,
    });
    assert.deepEqual(rotateAlignContentIcon(iconName, PhysicalFlexDirection.BOTTOM_TO_TOP), {
      iconName,
      rotate: 0,
      scaleX: 1,
      scaleY: 1,
    });
  });

  it('can find an icon for align-content properties', () => {
    const tests = [
      {
        style: {
          'flex-direction': 'row',
          'align-content': 'center',
        },
        iconName: 'flex-align-content-center-icon',
        expected: PhysicalFlexDirection.TOP_TO_BOTTOM,
      },
      {
        style: {
          'flex-direction': 'column',
          'align-content': 'center',
        },
        iconName: 'flex-align-content-center-icon',
        expected: PhysicalFlexDirection.LEFT_TO_RIGHT,
      },
      {
        style: {
          'flex-direction': 'row',
          'align-content': 'center',
          'writing-mode': 'vertical-rl',
        },
        iconName: 'flex-align-content-center-icon',
        expected: PhysicalFlexDirection.RIGHT_TO_LEFT,
      },
      {
        style: {
          'flex-direction': 'row',
          'align-content': 'center',
          'writing-mode': 'vertical-lr',
        },
        iconName: 'flex-align-content-center-icon',
        expected: PhysicalFlexDirection.LEFT_TO_RIGHT,
      },
      {
        style: {
          'flex-direction': 'row-reverse',
          'align-content': 'center',
          'writing-mode': 'vertical-rl',
        },
        iconName: 'flex-align-content-center-icon',
        expected: PhysicalFlexDirection.RIGHT_TO_LEFT,
      },
    ];

    for (const test of tests) {
      assert.deepEqual(
          findIcon(`align-content: ${test.style['align-content']}`, mapFromStyle(test.style)),
          rotateAlignContentIcon(test.iconName, test.expected),
          `Test align-content(${JSON.stringify(test.style)}) failed.`);
    }
  });

  it('can rotate an icon for justify-content', () => {
    const iconName = 'iconName';
    assert.deepEqual(rotateJustifyContentIcon(iconName, PhysicalFlexDirection.LEFT_TO_RIGHT), {
      iconName,
      rotate: 0,
      scaleX: 1,
      scaleY: 1,
    });
    assert.deepEqual(rotateJustifyContentIcon(iconName, PhysicalFlexDirection.RIGHT_TO_LEFT), {
      iconName,
      rotate: 0,
      scaleX: -1,
      scaleY: 1,
    });
    assert.deepEqual(rotateJustifyContentIcon(iconName, PhysicalFlexDirection.TOP_TO_BOTTOM), {
      iconName,
      rotate: 90,
      scaleX: 1,
      scaleY: 1,
    });
    assert.deepEqual(rotateJustifyContentIcon(iconName, PhysicalFlexDirection.BOTTOM_TO_TOP), {
      iconName,
      rotate: -90,
      scaleX: 1,
      scaleY: 1,
    });
  });


  it('can find an icon for justify-content properties', () => {
    const tests = [
      {
        style: {
          'flex-direction': 'row',
          'justify-content': 'center',
        },
        iconName: 'flex-justify-content-center-icon',
        expected: PhysicalFlexDirection.LEFT_TO_RIGHT,
      },
      {
        style: {
          'flex-direction': 'column',
          'justify-content': 'center',
        },
        iconName: 'flex-justify-content-center-icon',
        expected: PhysicalFlexDirection.TOP_TO_BOTTOM,
      },
      {
        style: {
          'flex-direction': 'row',
          'justify-content': 'center',
          'writing-mode': 'vertical-rl',
        },
        iconName: 'flex-justify-content-center-icon',
        expected: PhysicalFlexDirection.TOP_TO_BOTTOM,
      },
      {
        style: {
          'flex-direction': 'row',
          'justify-content': 'center',
          'writing-mode': 'vertical-lr',
        },
        iconName: 'flex-justify-content-center-icon',
        expected: PhysicalFlexDirection.TOP_TO_BOTTOM,
      },
      {
        style: {
          'flex-direction': 'row-reverse',
          'justify-content': 'center',
        },
        iconName: 'flex-justify-content-center-icon',
        expected: PhysicalFlexDirection.RIGHT_TO_LEFT,
      },
    ];

    for (const test of tests) {
      assert.deepEqual(
          findIcon(`justify-content: ${test.style['justify-content']}`, mapFromStyle(test.style)),
          rotateJustifyContentIcon(test.iconName, test.expected),
          `Test justify-content(${JSON.stringify(test.style)}) failed.`);
    }
  });

  it('can rotate an icon for align-items', () => {
    const iconName = 'iconName';
    assert.deepEqual(rotateAlignItemsIcon(iconName, PhysicalFlexDirection.LEFT_TO_RIGHT), {
      iconName,
      rotate: -90,
      scaleX: 1,
      scaleY: 1,
    });
    assert.deepEqual(rotateAlignItemsIcon(iconName, PhysicalFlexDirection.RIGHT_TO_LEFT), {
      iconName,
      rotate: 90,
      scaleX: 1,
      scaleY: 1,
    });
    assert.deepEqual(rotateAlignItemsIcon(iconName, PhysicalFlexDirection.TOP_TO_BOTTOM), {
      iconName,
      rotate: 0,
      scaleX: 1,
      scaleY: 1,
    });
    assert.deepEqual(rotateAlignItemsIcon(iconName, PhysicalFlexDirection.BOTTOM_TO_TOP), {
      iconName,
      rotate: 0,
      scaleX: 1,
      scaleY: 1,
    });
  });


  it('can find an icon for align-items properties', () => {
    const tests = [
      {
        style: {
          'flex-direction': 'row',
          'align-items': 'flex-start',
        },
        iconName: 'flex-align-items-flex-start-icon',
        expected: PhysicalFlexDirection.TOP_TO_BOTTOM,
      },
      {
        style: {
          'flex-direction': 'column',
          'align-items': 'flex-start',
        },
        iconName: 'flex-align-items-flex-start-icon',
        expected: PhysicalFlexDirection.LEFT_TO_RIGHT,
      },
      {
        style: {
          'flex-direction': 'row',
          'align-items': 'flex-start',
          'writing-mode': 'vertical-rl',
        },
        iconName: 'flex-align-items-flex-start-icon',
        expected: PhysicalFlexDirection.RIGHT_TO_LEFT,
      },
      {
        style: {
          'flex-direction': 'row',
          'align-items': 'flex-start',
          'writing-mode': 'vertical-lr',
        },
        iconName: 'flex-align-items-flex-start-icon',
        expected: PhysicalFlexDirection.LEFT_TO_RIGHT,
      },
      {
        style: {
          'flex-direction': 'column-reverse',
          'align-items': 'flex-start',
        },
        iconName: 'flex-align-items-flex-start-icon',
        expected: PhysicalFlexDirection.LEFT_TO_RIGHT,
      },
    ];

    for (const test of tests) {
      assert.deepEqual(
          findIcon(`align-items: ${test.style['align-items']}`, mapFromStyle(test.style)),
          rotateAlignItemsIcon(test.iconName, test.expected),
          `Test align-items(${JSON.stringify(test.style)}) failed.`);
    }
  });

  it('can find baseline icons', () => {
    const baselineIconInfo = {
      iconName: 'baseline-icon',
      rotate: 0,
      scaleX: 1,
      scaleY: 1,
    };
    assert.deepEqual(
        findIcon('align-items: baseline', mapFromStyle({})), baselineIconInfo,
        'Assertion for the \'align-items: baseline\' icon failed.');

    assert.deepEqual(
        findIcon('align-self: baseline', mapFromStyle({})), baselineIconInfo,
        'Assertion for the \'align-self: baseline\' icon failed.');

    assert.deepEqual(
        findIcon('align-content: baseline', mapFromStyle({})), baselineIconInfo,
        'Assertion for the \'align-content: baseline\' icon failed.');
  });

  it('can find an icon for align-self properties', () => {
    const tests = [
      {
        style: {
          'align-self': 'flex-start',
        },
        parentStyle: {
          'flex-direction': 'row',
        },
        iconName: 'flex-align-self-flex-start-icon',
        expected: PhysicalFlexDirection.TOP_TO_BOTTOM,
      },
      {
        style: {
          'align-self': 'flex-start',
        },
        parentStyle: {
          'flex-direction': 'column',
        },
        iconName: 'flex-align-self-flex-start-icon',
        expected: PhysicalFlexDirection.LEFT_TO_RIGHT,
      },
      {
        style: {
          'align-self': 'flex-start',
        },
        parentStyle: {
          'flex-direction': 'row',
          'writing-mode': 'vertical-rl',
        },
        iconName: 'flex-align-self-flex-start-icon',
        expected: PhysicalFlexDirection.RIGHT_TO_LEFT,
      },
      {
        style: {
          'align-self': 'flex-start',
        },
        parentStyle: {
          'writing-mode': 'vertical-lr',
          'flex-direction': 'row',
        },
        iconName: 'flex-align-self-flex-start-icon',
        expected: PhysicalFlexDirection.LEFT_TO_RIGHT,
      },
      {
        style: {
          'align-self': 'flex-start',
        },
        parentStyle: {
          'flex-direction': 'column-reverse',
        },
        iconName: 'flex-align-self-flex-start-icon',
        expected: PhysicalFlexDirection.LEFT_TO_RIGHT,
      },
    ];

    for (const test of tests) {
      assert.deepEqual(
          findIcon(`align-self: ${test.style['align-self']}`, mapFromStyle(test.style), mapFromStyle(test.parentStyle)),
          rotateAlignItemsIcon(test.iconName, test.expected), `Test align-self(${JSON.stringify(test.style)}) failed.`);
    }
  });
});
