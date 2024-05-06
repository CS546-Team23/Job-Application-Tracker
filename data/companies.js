import { companies } from "../config/mongoCollections.js";
import { ObjectId, ReturnDocument } from "mongodb";
import {
  checkIsProperString,
  isDateValid,
  validateId,
  currDate,
  isFollowupDateValid,
} from "../helpers.js";

const getCompanies = async () => {
  const companyCollection = await companies();
  let companyList = await companyCollection.find({}).toArray();
  companyList = companyList.map((object) => {
    object.logoUrl = `https://logo.clearbit.com/${object.Website}`;
    return object;
  });
  return companyList;
};

const getCompanyById = async (companyId) => {
  companyId = validateId(companyId);
  const companyCollection = await companies();
  const company = await companyCollection.findOne({
    _id: ObjectId.createFromHexString(companyId),
  });

  if (!company) {
    throw "Could not find company with id of " + companyId;
  }
  return company;
};

const getAllCompanyNames = async () => {
  const companyCollection = await companies();
  const companyList = await companyCollection
    .find({}, { projection: { company: 1, _id: 0 } })
    .toArray();
  return companyList.map((company) => company.company);
};

export default { getCompanies, getCompanyById, getAllCompanyNames };
