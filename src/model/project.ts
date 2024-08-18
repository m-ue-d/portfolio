export class Project {
    name: string;
    description: string;
    language: string;
    logo: string | undefined;

    constructor(public repo: any, logo?: string) {
        this.name = repo.name;
        this.description = repo.description;
        this.language = repo.language;
        this.logo = logo;
    }
}
