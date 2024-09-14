import { View, Text, Modal } from "react-native";
import React from "react";
import PdfViewer from "../common/PDFViewer";

const ShowOrderPdf = ({ visible, onClose, pdfUri }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      ></View>
    </Modal>
  );
};

export default ShowOrderPdf;
