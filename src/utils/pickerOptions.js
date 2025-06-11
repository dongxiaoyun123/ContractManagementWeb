import {  getDateByTimes } from "@/utils"; // 时间日期格式化成字符串
const pickerOptions = {
    shortcuts: [
        {
          text: "本月",
          onClick(picker) {
            const end = new Date();
            const start = new Date(new Date().setTime(new Date().setDate(1)));
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "上月",
          onClick(picker) {
            var range = getDateByTimes();
            const start = range[0];
            const end = range[1];
            picker.$emit("pick", [new Date(start), new Date(end)]);
          },
        },
        {
          text: "本年",
          onClick(picker) {
            const end = new Date();
            var y = end.getFullYear(); // 年

            var startStr = y + "-01-01";

            const start = new Date(startStr);
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "最近一周",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "最近一个月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "最近三个月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "最近半年",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "最近一年",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 360);
            picker.$emit("pick", [start, end]);
          },
        },
      ],
  };

  export default pickerOptions;
