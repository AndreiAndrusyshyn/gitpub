import { Service, KnexServiceOptions } from 'feathers-knex';
import { Application } from '../../declarations';
import axios from 'axios';

export class FetchInfo extends Service {
  private app: Application;
  constructor(options: Partial<KnexServiceOptions>, app: Application) {
    super({
      ...options,
      name: 'fetchinfo'
    });
    this.app = app;
  }

  async get(id:any , params:any) {
    console.log(id.user)
    // console.log("https://api.github.com/repos/"+id.repo);
    const knex = this.app.get('knexClient');
    const user =  await knex('users')
      .select()
      .where({ email: id.user })
      .then((resp: any) => {
        return resp[0].id
      });

    let a =  await axios.get("https://api.github.com/repos/"+id.repo, {
      headers: {
        "Authorization": "token "+"c8695b919aac33ebefe8f1c35f7a2ec47e01d9bb"
      }
    });


    let {owner, name, html_url,created_at, forks, open_issues, stargazers_count} = a.data;
    let {login} = owner;
     await knex('githubrequest')
      .insert({
        "userId": user,
        "projectOwner" : login,
        "projectName": name,
        "projectUrl": html_url,
        "countStars":stargazers_count,
        "countForks":forks,
        "countIssues":open_issues,
        "createdAt":created_at
      });

    return {login, name, html_url,created_at, forks, open_issues, stargazers_count}
  }
}
