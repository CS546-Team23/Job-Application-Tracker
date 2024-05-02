import { companies } from "../config/mongoCollections.js";
import { ObjectId, ReturnDocument } from "mongodb";
import {checkIsProperString, isDateValid, validateId, currDate, isFollowupDateValid} from '../helpers.js';


const getCompanies = async () =>{
    const companyCollection = await companies();
    let companyList = await companyCollection.find({}).toArray();
    companyList = companyList.map((object) => {
      object.logoUrl = `https://logo.clearbit.com/${object.Website}?size=200&format=png&greyscale=true`;
      return object;
    });
    return companyList;
}

const getCompanyById = async (companyId) =>{
    companyId = validateId(companyId);
    const companyCollection = await companies();
    const company = await companyCollection.findOne({_id: ObjectId.createFromHexString(companyId)});

    if (!company) {
      throw 'Could not find company with id of ' + companyId;
    }
    return company;
}

export default {getCompanies, getCompanyById}