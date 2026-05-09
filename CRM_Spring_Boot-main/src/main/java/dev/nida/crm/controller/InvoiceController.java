package dev.nida.crm.controller;

import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import dev.nida.crm.dto.InvoiceResponse;
import dev.nida.crm.service.InvoiceService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @GetMapping("/offer/{offerId}")
    public ResponseEntity<InvoiceResponse> getInvoice(@PathVariable Long offerId) {
        return ResponseEntity.ok(invoiceService.getInvoiceByOfferId(offerId));
    }

    @GetMapping("/offer/{offerId}/pdf")
    public ResponseEntity<byte[]> getInvoicePdf(@PathVariable Long offerId) throws Exception {
        InvoiceResponse inv = invoiceService.getInvoiceByOfferId(offerId);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfDocument pdf = new PdfDocument(new PdfWriter(baos));
        Document doc = new Document(pdf);

        PdfFont bold    = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD);
        PdfFont regular = PdfFontFactory.createFont(StandardFonts.HELVETICA);
        DeviceRgb primary  = new DeviceRgb(99, 102, 241);
        DeviceRgb lightBg  = new DeviceRgb(241, 245, 249);
        DeviceRgb muted    = new DeviceRgb(100, 116, 139);
        DeviceRgb green    = new DeviceRgb(22, 163, 74);

        // Header
        doc.add(new Paragraph("CRM System").setFont(bold).setFontSize(22).setFontColor(primary).setMarginBottom(2));
        doc.add(new Paragraph("OFFICIAL INVOICE").setFont(regular).setFontSize(9).setFontColor(muted).setMarginBottom(4));
        doc.add(new Paragraph("Invoice No: INV-" + String.format("%05d", inv.getInvoiceNo()))
                .setFont(regular).setFontSize(10).setFontColor(muted).setMarginBottom(16));

        // Divider
        Table divider = new Table(UnitValue.createPercentArray(new float[]{1})).useAllAvailableWidth();
        divider.addCell(new Cell().setHeight(2).setBackgroundColor(primary).setBorder(null));
        doc.add(divider);
        doc.add(new Paragraph(" ").setMarginBottom(12));

        // Customer Details
        doc.add(new Paragraph("BILL TO").setFont(bold).setFontSize(8).setFontColor(primary).setMarginBottom(6));
        Table customerTable = new Table(UnitValue.createPercentArray(new float[]{1})).useAllAvailableWidth().setMarginBottom(20);
        Cell customerCell = new Cell().setBorder(null).setBackgroundColor(lightBg).setPadding(14);
        customerCell.add(new Paragraph(inv.getCustomerName()).setFont(bold).setFontSize(11).setMarginBottom(4));
        customerCell.add(new Paragraph(inv.getCustomerEmail() != null ? inv.getCustomerEmail() : "").setFont(regular).setFontSize(9).setFontColor(muted));
        customerCell.add(new Paragraph(inv.getCustomerPhone() != null ? inv.getCustomerPhone() : "").setFont(regular).setFontSize(9).setFontColor(muted));
        customerCell.add(new Paragraph(inv.getCustomerAddress() != null ? inv.getCustomerAddress() : "").setFont(regular).setFontSize(9).setFontColor(muted));
        customerTable.addCell(customerCell);
        doc.add(customerTable);

        // Product / Description table
        doc.add(new Paragraph("PRODUCT DETAILS").setFont(bold).setFontSize(8).setFontColor(primary).setMarginBottom(6));
        Table itemTable = new Table(UnitValue.createPercentArray(new float[]{4, 1, 1, 1})).useAllAvailableWidth().setMarginBottom(24);
        for (String h : new String[]{"Description", "Price", "Discount", "Total"}) {
            itemTable.addHeaderCell(new Cell().setBackgroundColor(lightBg).setBorder(null)
                    .add(new Paragraph(h).setFont(bold).setFontSize(9).setFontColor(muted)));
        }
        String discountLabel = inv.getDiscountPercent() > 0
                ? inv.getDiscountPercent() + "% (-$" + inv.getDiscountAmount() + ")" : "-";
        itemTable.addCell(new Cell().setBorder(null).add(new Paragraph(inv.getDescription() != null ? inv.getDescription() : "").setFont(regular).setFontSize(9)));
        itemTable.addCell(new Cell().setBorder(null).add(new Paragraph("$" + inv.getPrice()).setFont(regular).setFontSize(9)));
        itemTable.addCell(new Cell().setBorder(null).add(new Paragraph(discountLabel).setFont(regular).setFontSize(9)));
        itemTable.addCell(new Cell().setBorder(null).add(new Paragraph("$" + inv.getTotalAmount()).setFont(bold).setFontSize(10).setFontColor(green)));
        doc.add(itemTable);

        // Footer
        doc.add(new Paragraph("Thank you for your business — Generated by CRM System")
                .setFont(regular).setFontSize(8).setFontColor(muted).setTextAlignment(TextAlignment.CENTER));

        doc.close();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=invoice-" + offerId + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(baos.toByteArray());
    }
}

