import * as nunjucks from 'nunjucksBB';
import {Environment} from 'nunjucksBB';
import {readFile} from 'fs/promises';

/* This script can run on the server */

class TwoStageTester
{
	static async run():Promise<void>
	{
//		let env2: nunjucks.Environment;
		let env2: Environment;

		const precompiled = await readFile('test1.njk.js',{encoding:'UTF8' as BufferEncoding});

		global.window = <any>{};

		eval(precompiled);
//		const func = new Function(precompiled);
//		func();

		console.log('window:',window);

		console.log('precompiled:',precompiled);

		console.log('XXXX',(<any>window).nunjucksPrecompiled);

		const env = new nunjucks.Environment(new nunjucks.PrecompiledLoader(window.nunjucksPrecompiled),{
			trimBlocks:true,
			lstripBlocks:true
			//throwOnUndefined:true
		});

		const template = await env.getTemplate('top.njk'); 
		const result = await template.render({blah:1});
		console.log('result:',result);
	}
}

TwoStageTester.run().catch(err => console.log(err));

