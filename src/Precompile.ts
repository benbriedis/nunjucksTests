import * as nunjucks from 'nunjucksBB';
import {open} from 'fs/promises';
//import NunjucksExtensions from 'Browser/NunjucksEnv';

export default class Precompile
{
	static async run():Promise<void>
	{
		const env = nunjucks.configure({
			trimBlocks:true,
			lstripBlocks:true
			//throwOnUndefined:true
		});
//		NunjucksExtensions.extend(this.env);

		await this.compileOne('top.njk',env);
		await this.compileOne('import1.njk',env);
		await this.compileOne('import2.njk',env);
		await this.compileOne('include.njk',env);
	}

	static async compileOne(templateName:string,env:nunjucks.Environment)
	{
		const handle = await open(templateName,'r');
		const contents = await handle.readFile({encoding:'UTF-8' as BufferEncoding});
		const compiled = nunjucks.precompileString(contents,{name:templateName,env:env});
		console.log(compiled);
		await handle.close();
	}
}

Precompile.run().catch(err => console.log(err));

