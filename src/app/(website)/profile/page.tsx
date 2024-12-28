"use client";

import { useState } from "react";
import {
  Button,
  Form,
  Modal,
  Table,
  Input,
  Tabs,
  Upload,
  UploadFile,
  Select,
} from "antd";
import Image from "next/image";
import moment from "moment";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { PiSuitcaseSimple } from "react-icons/pi";
import { FaEye, FaRegBuilding } from "react-icons/fa";
import {
  MdOutlineEmail,
  MdOutlineLocalPhone,
  MdOutlineLocationOn,
} from "react-icons/md";
import { TbShoppingCartCheck } from "react-icons/tb";
import { IoIosCalculator } from "react-icons/io";
import { RiMoneyCnyCircleLine } from "react-icons/ri";
import { GiMoneyStack } from "react-icons/gi";
import profileBanner from "../../../assets/profileBanner.png";
import profileImg from "../../../assets/randomProfile4.jpg";
import Heading from "@/components/shared/Heading";
import toast from "react-hot-toast";
import { LuUpload } from "react-icons/lu";

const profile = {
  name: "John Doe",
  designation: "Marketing Manager",
  company: "TechSphere Innovations Ltd.",
  email: "johndoe@example.com",
  phone: "+1 123 456 7890",
  address: "123 Elm Street, Springfield, USA",
  profileImage: profileImg.src,
  budgetDetails: {
    assigned: "50,000",
    duration: "12 months",
    assignDate: "2024-01-01",
    expirationDate: "2024-12-31",
  },
  totalOrder: 120,
  totalBudget: "50,000",
  totalSpend: "35,000",
  remainingBudget: "15,000",
  orderHistory: [
    {
      _id: "1",
      productName: "Digital Marketing Campaign",
      item: "Social Media Ads",
      price: "5,000",
      status: "Completed",
      date: "2024-02-15",
    },
    {
      _id: "2",
      productName: "SEO Optimization",
      item: "On-page SEO",
      price: "3,000",
      status: "Completed",
      date: "2024-03-10",
    },
    {
      _id: "3",
      productName: "Brand Design",
      item: "Logo Design",
      price: "2,000",
      status: "In Progress",
      date: "2024-12-20",
    },
    {
      _id: "4",
      productName: "Content Marketing",
      item: "Blog Posts",
      price: "10,000",
      status: "Pending",
      date: "2024-12-25",
    },
    {
      _id: "5",
      productName: "PPC Campaign",
      item: "Google Ads",
      price: "8,000",
      status: "Completed",
      date: "2024-04-05",
    },
    {
      _id: "6",
      productName: "Website Development",
      item: "E-commerce Website",
      price: "50,000",
      status: "In Progress",
      date: "2024-05-12",
    },
    {
      _id: "7",
      productName: "Email Marketing",
      item: "Newsletter Campaign",
      price: "4,000",
      status: "Pending",
      date: "2024-06-15",
    },
    {
      _id: "8",
      productName: "App Development",
      item: "Mobile App",
      price: "100,000",
      status: "In Progress",
      date: "2024-07-18",
    },
    {
      _id: "9",
      productName: "Video Marketing",
      item: "YouTube Ads",
      price: "12,000",
      status: "Completed",
      date: "2024-08-25",
    },
    {
      _id: "10",
      productName: "Graphic Design",
      item: "Banner Design",
      price: "3,500",
      status: "Pending",
      date: "2024-09-10",
    },
    {
      _id: "11",
      productName: "SEO Services",
      item: "Technical SEO",
      price: "6,000",
      status: "Completed",
      date: "2024-10-01",
    },
    {
      _id: "12",
      productName: "Brand Strategy",
      item: "Market Analysis",
      price: "7,500",
      status: "In Progress",
      date: "2024-10-20",
    },
    {
      _id: "13",
      productName: "Photography",
      item: "Product Photoshoot",
      price: "15,000",
      status: "Pending",
      date: "2024-11-05",
    },
    {
      _id: "14",
      productName: "Social Media Management",
      item: "Monthly Content Plan",
      price: "9,000",
      status: "Completed",
      date: "2024-11-15",
    },
    {
      _id: "15",
      productName: "Public Relations",
      item: "Press Release",
      price: "20,000",
      status: "Completed",
      date: "2024-11-30",
    },
  ],
};

const ProfilePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "profile.png",
      status: "done",
      url: profile.profileImage,
    },
  ]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // console.log(fileList);

  const showModal = () => {
    form.setFieldsValue(profile);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (fileList.length > 0 && fileList[0].url) {
        values.profileImage = fileList[0].url;
      }
      // console.log("Updated Profile:", { ...values, image: fileList });
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    setFileList(newFileList);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
  };

  const filteredOrderHistory = profile.orderHistory.filter((order) => {
    return (
      order.productName.toLowerCase().includes(searchText.toLowerCase()) &&
      (statusFilter ? order.status === statusFilter : true)
    );
  });

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string) => (
        <span
          className={
            text === "Completed"
              ? "text-green-500"
              : text === "In Progress"
              ? "text-blue-500"
              : "text-red-500"
          }
        >
          {text}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => <span>{moment(date).format("L")}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: () => <FaEye size={20} color="#292C61" />,
    },
  ];

  const uploadProps = {
    beforeUpload: (file: UploadFile) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        toast.error("You can only upload JPG/PNG file!");
      }
      const isLt2M = file.size ? file.size / 1024 / 1024 < 2 : false;
      if (!isLt2M) {
        toast.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    onChange: handleChange,
    fileList,
    maxCount: 1,
  };

  return (
    <div className="max-w-[1500px] mx-auto my-10 flex gap-5 w-full">
      <div className="w-[35%]">
        <div className="border rounded-2xl shadow-md relative">
          <Image
            className="w-full rounded-t-2xl h-[180px]"
            src={profileBanner}
            alt="profileBanner"
          />
          <div className="absolute flex flex-col items-center top-12 left-5 ">
            <div className="w-48 h-48 border-8 rounded-full border-white">
              <Image
                className="object-cover w-full h-full rounded-full"
                src={profile.profileImage}
                alt="profileImg"
                width={200}
                height={200}
              />
            </div>
            <Heading className="text-md flex items-center gap-4">
              {profile?.name}{" "}
              <span>
                <BsFillPatchCheckFill color="#1e88e5" size={30} />
              </span>
            </Heading>
          </div>
          <div className="mt-36 px-8 mb-8">
            <h1 className="flex items-center gap-2 text-lg">
              <span>
                <PiSuitcaseSimple />
              </span>
              {profile?.designation}
            </h1>
            <h1 className="flex items-center gap-2 text-lg">
              <span>
                <FaRegBuilding />
              </span>
              {profile?.company}
            </h1>
            <h1 className="flex items-center gap-2 text-lg">
              <span>
                <MdOutlineEmail />
              </span>
              {profile?.email}
            </h1>
            <h1 className="flex items-center gap-2 text-lg">
              <span>
                <MdOutlineLocalPhone />
              </span>
              {profile?.phone}
            </h1>
            <h1 className="flex items-center gap-2 text-lg">
              <span>
                <MdOutlineLocationOn />
              </span>
              {profile?.address}
            </h1>
          </div>
        </div>
        <Button
          onClick={showModal}
          className="w-full !border-primary !text-primary !py-5 hover:!bg-primary hover:!text-white my-7"
        >
          Edit Profile
        </Button>

        <Modal
          title="Edit Profile"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1000}
          okText="Update"
          okButtonProps={{
            style: { backgroundColor: "#1e88e5", borderColor: "#1e88e5" },
          }}
        >
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Edit Profile" key="1">
              <Form form={form} layout="vertical">
                <div className="flex justify-between items-center">
                  <div style={{ width: "48%" }}>
                    <Form.Item
                      name="name"
                      label="Name"
                      rules={[{ required: true }]}
                    >
                      <Input style={{ height: "50px", width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[{ required: true, type: "email" }]}
                    >
                      <Input style={{ height: "50px", width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      name="phone"
                      label="Phone"
                      rules={[{ required: true }]}
                    >
                      <Input style={{ height: "50px", width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      name="address"
                      label="Address"
                      rules={[{ required: true }]}
                    >
                      <Input style={{ height: "50px", width: "100%" }} />
                    </Form.Item>
                  </div>
                  <div style={{ width: "48%" }}>
                    <Form.Item label="Profile Image">
                      <Upload
                        {...uploadProps}
                        listType="picture-card"
                        className="upload-full-width"
                      >
                        {fileList.length < 1 && (
                          <div>
                            <LuUpload />
                            <div style={{ marginTop: 8 }}>Upload</div>
                          </div>
                        )}
                      </Upload>
                    </Form.Item>

                    <Form.Item
                      name="company"
                      label="Company Name"
                      rules={[{ required: true }]}
                    >
                      <Input style={{ height: "50px", width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      name="designation"
                      label="Designation"
                      rules={[{ required: true }]}
                    >
                      <Input style={{ height: "50px", width: "100%" }} />
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Change Password" key="2">
              <Form form={form} layout="vertical">
                <Form.Item
                  name="currentPassword"
                  label="Current Password"
                  rules={[{ required: true }]}
                >
                  <Input.Password style={{ height: "50px", width: "100%" }} />
                </Form.Item>
                <Form.Item
                  name="newPassword"
                  label="New Password"
                  rules={[{ required: true }]}
                >
                  <Input.Password style={{ height: "50px", width: "100%" }} />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={["newPassword"]}
                  hasFeedback
                  rules={[
                    { required: true },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The two passwords do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password style={{ height: "50px", width: "100%" }} />
                </Form.Item>
              </Form>
            </Tabs.TabPane>
          </Tabs>
        </Modal>

        <div className="shadow-md">
          <h1 className="bg-primary text-white px-10 py-3 rounded-t-2xl font-semibold">
            Budget Details
          </h1>
          <div className="p-5">
            <h1 className="text-lg">
              Assigned Budget: <span>${profile?.budgetDetails?.assigned}</span>
            </h1>
            <h1 className="text-lg">
              Assigned Budget: <span>{profile?.budgetDetails?.duration}</span>
            </h1>
            <h1 className="text-lg">
              Assigned Budget:{" "}
              <span>
                {moment(profile?.budgetDetails?.assignDate).format("LL")}
              </span>
            </h1>
            <h1 className="text-lg">
              Assigned Budget:{" "}
              <span>
                {moment(profile?.budgetDetails?.expirationDate).format("LL")}
              </span>
            </h1>
          </div>
        </div>
      </div>

      <div className="w-[65%]">
        <div className="grid grid-col-1 md:grid-cols-4 gap-5">
          <div className="flex flex-col hover:shadow-xl px-10 rounded-2xl shadow-md py-6 gap-3 items-center">
            <div className="p-6 rounded-2xl bg-[#f3f3ff]">
              <TbShoppingCartCheck size={40} />
            </div>
            <h1 className="text-lg text-gray-600">Total Order</h1>
            <h1 className="text-2xl font-bold">{profile?.totalOrder}</h1>
          </div>
          <div className="flex flex-col hover:shadow-xl px-10 rounded-2xl shadow-md py-6 gap-3 items-center">
            <div className="p-6 rounded-2xl bg-[#fff6da]">
              <IoIosCalculator size={40} />
            </div>
            <h1 className="text-lg text-gray-600">Total Budget</h1>
            <h1 className="text-2xl font-bold">{profile?.totalBudget}</h1>
          </div>
          <div className="flex flex-col hover:shadow-xl px-10 rounded-2xl shadow-md py-6 gap-3 items-center">
            <div className="p-6 rounded-2xl bg-[#edf6fd]">
              <RiMoneyCnyCircleLine size={40} />
            </div>
            <h1 className="text-lg text-gray-600">Total Spend</h1>
            <h1 className="text-2xl font-bold">{profile?.totalSpend}</h1>
          </div>
          <div className="flex flex-col hover:shadow-xl px-8 rounded-2xl shadow-md py-6 gap-3 items-center">
            <div className="p-6 rounded-2xl bg-[#fce7e7]">
              <GiMoneyStack size={40} />
            </div>
            <h1 className="text-lg text-gray-600">Remaining Budget</h1>
            <h1 className="text-2xl font-bold">{profile?.remainingBudget}</h1>
          </div>
        </div>

        <Heading className="mt-10">My Order History</Heading>
        <div className="flex justify-between items-center my-5">
          <Input
            placeholder="Search by product name"
            value={searchText}
            onChange={handleSearch}
            style={{ width: "30%" }}
          />
          <Select
            placeholder="Filter by status"
            onChange={handleStatusChange}
            style={{ width: "20%" }}
            allowClear
          >
            <Select.Option value="Completed">Completed</Select.Option>
            <Select.Option value="In Progress">In Progress</Select.Option>
            <Select.Option value="Pending">Pending</Select.Option>
          </Select>
        </div>

        <Table
          columns={columns}
          dataSource={filteredOrderHistory}
          rowKey={(record) => record._id}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
