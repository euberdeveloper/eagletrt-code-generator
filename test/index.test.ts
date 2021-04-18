if (!process.env.IS_WEBPACK) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('module-alias/register');
}

import generator from '@test/lib/generator.test';
import utils from '@test/lib/utils.test';

describe('@eagletrt/eagletrt-code-generator', function () {
    generator();
    utils();
});
