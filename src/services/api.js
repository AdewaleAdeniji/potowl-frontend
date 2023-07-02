import axios from "axios";

export const SendOTP = async (number) => {
  var config = {
    method: "get",
    url: `http://localhost:3003/check/${number}`,
    headers: {},
  };
  try {
    const req = await axios(config);
    return {
      success: true,
      ...req.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err?.response?.data?.message || "Request failed ",
    };
  }
};
export const AddNumberAPI = async (number, key) => {
    var config = {
      method: "get",
      url: `http://localhost:3003/add/${number}/${key}`,
      headers: {},
    };
    try {
      const req = await axios(config);
      return {
        success: true,
        ...req.data,
      };
    } catch (err) {
      return {
        success: false,
        message: err?.response?.data?.message || "Request failed ",
      };
    }
  };

export const GetListedNumbers = async (key) => {
  var config = {
    method: "get",
    url: `http://localhost:3003/numbers/${key}`,
    headers: {},
  };
  try {
    const req = await axios(config);
    return {
      success: true,
      ...req.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err?.response?.data?.message || "Request failed ",
    };
  }
};
export const DisableNumber = async (key, number) => {
  var config = {
    method: "get",
    url: `http://localhost:3003/remove/${number}/${key}`,
    headers: {},
  };
  try {
    const req = await axios(config);
    return {
      success: true,
      ...req.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err?.response?.data?.message || "Request failed ",
    };
  }
};
export const ReactivateNumber = async (key, number) => {
    var config = {
      method: "get",
      url: `http://localhost:3003/activate/${number}/${key}`,
      headers: {},
    };
    try {
      const req = await axios(config);
      return {
        success: true,
        ...req.data,
      };
    } catch (err) {
      return {
        success: false,
        message: err?.response?.data?.message || "Request failed ",
      };
    }
  };
export const GetData = async (number, dataNumber, otp, network) => {
  var config = {
    method: "get",
    url: `http://localhost:3003/buy/${number}/${dataNumber}/${otp}/${network}`,
    headers: {},
  };
  try {
    const req = await axios(config);
    return {
      success: true,
      ...req.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err?.response?.data?.message || "Request failed ",
    };
  }
};
