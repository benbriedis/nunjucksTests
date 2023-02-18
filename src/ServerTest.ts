/*
	Installed using: 
		npm i https://github.com/benbriedis/nunjucksBB
	For more see:
		 https://www.pluralsight.com/guides/install-npm-packages-from-gitgithub
*/

import nunjucks from 'nunjucksBB';

class ServerTest
{

	static async run():Promise<void>
	{
//		const env: nunjucks.Environment;

		const templateName = 'top.njk';
		const data = {
			a:1,
			b:2
		};

	const result = await nunjucks.render(templateName,data);

console.log('result:',result);	

	}
}

ServerTest.run().catch(err => console.log(err));
