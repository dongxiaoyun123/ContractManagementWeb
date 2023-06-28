export function updateContractsRules() {
   return {
    ContractCode: [
      { required: false, message: "请输入合同编号", trigger: "blur" },
      {
        min: 1,
        max: 50,
        message: "长度在 1 到 50 个字符内",
        trigger: "blur",
      },
    ],
    SecondContractNumberPrefix: [
      { required: false, message: "请输入乙方合同编号", trigger: "blur" },
      {
        min: 1,
        max: 50,
        message: "长度在 1 到 50 个字符内",
        trigger: "blur",
      },
    ],

    ContractName: [
      { required: true, message: "请输入合同名称", trigger: "change" },
    ],
    CompanyId: [
      { required: true, message: "请输入公司名称", trigger: "change" },
    ],
    ContractType: [
      { required: true, message: "请输入合同类型", trigger: "change" },
    ],
    PaymentMethod: [
      { required: true, message: "请选择缴费方式", trigger: "change" },
    ],
    BeginTime: [
      {
        required: true,
        message: "请选择开始日期",
        trigger: "change",
      },
    ],
    EndTime: [
      {
        required: true,
        message: "请选择开始日期",
        trigger: "change",
      },
    ],
    Percentage: [
      {
        required: true,
        pattern:
          /^([0-9]\d*(\.\d{1,2})?|([0](\.([0][0-9]|[0-9]\d{0,1}))))$/,
        message: "提成比例输入不合法（不能小于0小数位不超过2位）",
        trigger: "blur",
      },
    ],
    ProfitMargin: [
      {
        required: false,
        pattern:
          /^([0-9]\d*(\.\d{1,2})?|([0](\.([0][0-9]|[0-9]\d{0,1}))))$/,
        message: "利润率输入不合法（不能小于0小数位不超过2位）",
        trigger: "blur",
      },
    ],
    UnitPrice: [
      {
        required: true,
        message: "请输入单价",
        trigger: "blur",
      },
    ],
    Quantity: [
      {
        required: true,
        message: "请输入数量",
        trigger: "blur",
      },
    ],
    ContractAmount: [
      {
        required: true,
        pattern:
          /^([0-9]\d*(\.\d{1,2})?|([0](\.([0][0-9]|[0-9]\d{0,1}))))$/,
        message: "合同金额输入不合法（不能小于0小数位不超过2位）",
        trigger: "blur",
      },
    ],
    SaleId: [
      { required: true, message: "请选择销售人员", trigger: "change" },
    ],
    FirstPartyName: [
      { required: true, message: "请输入甲方名称", trigger: "blur" },
      {
        min: 1,
        max: 50,
        message: "甲方名称长度在 1 到 50 个字符内",
        trigger: "blur",
      },
    ],
    FirstPartyAddress: [
      { required: false },
      {
        min: 1,
        max: 100,
        message: "甲方地址长度在 1 到 100 个字符内",
        trigger: "blur",
      },
    ],
    FirstPartyContacts: [
      { required: false },
      {
        min: 1,
        max: 10,
        message: "甲方联系人长度在 1 到 10 个字符内",
        trigger: "blur",
      },
    ],
    FirstPartyPhone: [
      { required: false },
      {
        message: "甲方联系电话输入不合法",
        trigger: "blur",
        validator: checkMobile,
      },
    ],
    FirstPartyEmail: [
      { required: false },
      {
        message: "甲方工作邮箱输入不合法",
        trigger: "blur",
        validator: checkEmail,
      },
    ],
    FirstPartyBank: [
      { required: false },
      {
        min: 1,
        max: 50,
        message: "甲方开户行长度在 1 到 50 个字符内",
        trigger: "blur",
      },
    ],
    FirstPartyBankNum: [
      { required: false },
      {
        message: "甲方银行账号输入不合法",
        trigger: "blur",
        validator: checkCard,
      },
    ],
    SecondPartyName: [
      { required: true, message: "请选择乙方名称", trigger: "change" },
    ],
    SecondPartyAddress: [
      { required: false },
      {
        min: 1,
        max: 100,
        message: "乙方地址长度在 1 到 100 个字符内",
        trigger: "blur",
      },
    ],
    SecondPartyContacts: [
      { required: false },
      {
        min: 1,
        max: 10,
        message: "乙方联系人长度在 1 到 10 个字符内",
        trigger: "blur",
      },
    ],
    SecondPartyPhone: [
      { required: false },
      {
        message: "乙方联系电话输入不合法",
        trigger: "blur",
        validator: checkMobile,
      },
    ],
    SecondPartyEmail: [
      { required: false },
      {
        message: "乙方工作邮箱输入不合法",
        trigger: "blur",
        validator: checkEmail,
      },
    ],
    SecondPartyBank: [
      { required: false },
      {
        min: 1,
        max: 50,
        message: "乙方开户行长度在 1 到 50 个字符内",
        trigger: "blur",
      },
    ],
    SecondPartyBankNum: [
      { required: false },
      {
        message: "乙方银行账号输入不合法",
        trigger: "blur",
        validator: checkCard,
      },
    ],
    ThirdPartyName: [
      { required: false },
      {
        min: 1,
        max: 50,
        message: "丙方名称行长度在 1 到 50 个字符内",
        trigger: "blur",
      },
    ],
    ThirdPartyAddress: [
      { required: false },
      {
        min: 1,
        max: 100,
        message: "丙方地址长度在 1 到 100 个字符内",
        trigger: "blur",
      },
    ],
    ThirdPartyContacts: [
      { required: false },
      {
        min: 1,
        max: 10,
        message: "丙方联系人长度在 1 到 10 个字符内",
        trigger: "blur",
      },
    ],
    ThirdPartyPhone: [
      { required: false },
      {
        message: "丙方联系电话输入不合法",
        trigger: "blur",
        validator: checkMobile,
      },
    ],
    ThirdPartyEmail: [
      { required: false },
      {
        message: "丙方工作邮箱输入不合法",
        trigger: "blur",
        validator: checkEmail,
      },
    ],
    ThirdPartyBank: [
      { required: false },
      {
        min: 1,
        max: 50,
        message: "丙方开户行长度在 1 到 50 个字符内",
        trigger: "blur",
      },
    ],
    ThirdPartyBankNum: [
      { required: false },
      {
        message: "丙方银行账号输入不合法",
        trigger: "blur",
        validator: checkCard,
      },
    ],

  }
}
 // 自定义手机号规则
 var checkMobile = (rule, value, callback) => {
    if (value) {
      const regMobile = /^1[34578]\d{9}$/;
      if (regMobile.test(value)) {
        return callback();
      }
      // 返回一个错误提示
      callback(new Error("请输入正确的手机号码"));
    } else {
      return callback();
    }
  };
  // 自定义邮箱规则
  var checkEmail = (rule, value, callback) => {
    const regEmail = /^\w+@\w+(\.\w+)+$/;
    if (!value) {
      return callback();
    } else if (regEmail.test(value)) {
      // 合法邮箱
      return callback();
    }
    callback(new Error("请输入正确的邮箱"));
  };

  // 银行卡校验规则
  var checkCard = (rule, value, callback) => {
    if (value) {
      const regMobile = /^([1-9]{1})(\d{15}|\d{18})$/;
      if (regMobile.test(value)) {
        return callback();
      }
      // 返回一个错误提示
      callback(new Error("请输入正确的银行卡号"));
    } else {
      return callback();
    }
  };