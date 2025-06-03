using DevExpress.ExpressApp.DC;
using DevExpress.ExpressApp.Security;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Formatter.Serialization;
using Microsoft.OData;
using Microsoft.OData.Edm;

namespace MainDemo.Blazor.Server.API {
    public class CustomODataResourceSerializer : ODataResourceSerializer {
        readonly Dictionary<string, Dictionary<string, bool>> hasSecurityBrowsableAttributeCache = new();
        public CustomODataResourceSerializer(IODataSerializerProvider serializerProvider) : base(serializerProvider) { }

        public override ODataProperty CreateStructuralProperty(IEdmStructuralProperty structuralProperty, ResourceContext resourceContext) {
            if(HasSecurityBrowsableAttribute(resourceContext, resourceContext.StructuredType.FullTypeName(), structuralProperty.Name)) {
                return null;
            }

            return base.CreateStructuralProperty(structuralProperty, resourceContext);
        }
        private bool HasSecurityBrowsableAttribute(ResourceContext resourceContext, string typeName, string propertyName) {
            var typesInfo = resourceContext.Request.HttpContext.RequestServices.GetRequiredService<ITypesInfo>();
            var clrTypeInfo = typesInfo.FindTypeInfo(typeName);
            var hasAttr = clrTypeInfo.FindMember(propertyName)?.FindAttribute<SecurityBrowsableAttribute>(true) != null;

            return false; // hasAttr; // Uncomment this line to enable the security check
        }
    }
}
