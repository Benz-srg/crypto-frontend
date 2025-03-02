import * as yup from "yup";
import { useFormik } from "formik";

import { Cryptocurrency } from "@/types/crypto";

import { useToast } from "@/hooks/useToast";
import { createOrUpdateCrypto } from "@/services/cryptoService";

interface CryptoFormProps {
  closeDialog: () => void;
  initialData?: Partial<Cryptocurrency> & { id?: string };
}

const validationSchema = yup.object({
  name: yup.string().required("Please select a cryptocurrency."),
  symbol: yup.string().required("Symbol is required."),
  price: yup
    .number()
    .typeError("Price must be a valid number.")
    .positive("Price must be greater than zero.")
    .required("Price is required."),
});

const CryptoForm: React.FC<CryptoFormProps> = ({
  closeDialog,
  initialData,
}) => {
  const { showToast } = useToast();

  const formik = useFormik({
    initialValues: {
      id: initialData?.id || "",
      name: initialData?.name || "",
      symbol: initialData?.symbol || "",
      price: initialData?.price || 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log("values : ", values);
        await createOrUpdateCrypto(values);
        showToast("Cryptocurrency saved successfully!", "success");
        formik.resetForm();
        closeDialog();
      } catch (error) {
        showToast("Failed to save cryptocurrency.", "error");
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="space-y-4" noValidate>
        <h2 className="text-xl font-semibold text-gray-900">
          {formik.values.id ? "Update Cryptocurrency" : "Add Cryptocurrency"}
        </h2>

        <div>
          <label className="block text-gray-700">Cryptocurrency Name</label>
          <input
            type="text"
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            {...formik.getFieldProps("name")}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            list="crypto-options"
          />

          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Symbol</label>
          <input
            type="text"
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            {...formik.getFieldProps("symbol")}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.symbol && formik.errors.symbol && (
            <p className="text-red-500 text-sm">{formik.errors.symbol}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Price (USD)</label>
          <input
            type="number"
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            {...formik.getFieldProps("price")}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.price && formik.errors.price && (
            <p className="text-red-500 text-sm">{formik.errors.price}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {formik.values.id ? "Update" : "Submit"}
        </button>
      </form>
    </>
  );
};

export default CryptoForm;
