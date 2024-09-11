/** @odoo-module **/
import { patch } from "@web/core/utils/patch";
import { ListArchParser } from "@web/views/list/list_arch_parser";

patch(ListArchParser.prototype, "get_row_number_attribute", {
    parse(arch, models, modelName) {
        const result = this._super.apply(this, arguments);
        // console.dir(result, { depth: null });
        
        this.visitXML(arch, (node) => {
            if (["tree", "list"].includes(node.tagName)) {
                const rowNumber = Boolean(node.getAttribute("row_number"));
                // console.log("rowNumber = " + rowNumber);
                result.row_number = rowNumber;
            }
        });

        return result;
    }
});
