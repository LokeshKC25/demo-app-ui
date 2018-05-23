export class StudentModel {
    _id: String;
    userId: String;
    companies: Array<CompanyStatusModel> = [];
}

export class CompanyStatusModel {
    id: String;
    name: String;
    location: String;
    eligibility: String;
    applied: Boolean = false;
    status: String;
}
