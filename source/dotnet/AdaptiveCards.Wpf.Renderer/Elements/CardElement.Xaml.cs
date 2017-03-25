
using System.Windows;

namespace Adaptive.Renderers
{
    public partial class XamlRenderer
        : AdaptiveRenderer<FrameworkElement, RenderContext>
    {

        protected override FrameworkElement RenderCardElement(CardElement cardElement, RenderContext context)
        {
            if (cardElement is Image)
                return RenderImage((Image)cardElement, context);

            if (cardElement is TextBlock)
                return RenderTextBlock((TextBlock)cardElement, context);

            if (cardElement is Container)
                return RenderContainer((Container)cardElement, context);

            if (cardElement is ColumnSet)
                return RenderColumnSet((ColumnSet)cardElement, context);

            if (cardElement is ImageSet)
                return RenderImageSet((ImageSet)cardElement, context);

            if (cardElement is FactSet)
                return RenderFactSet((FactSet)cardElement, context);

            if (cardElement is InputChoiceSet)
                return RenderInputChoiceSet((InputChoiceSet)cardElement, context);

            if (cardElement is InputText)
                return RenderInputText((InputText)cardElement, context);

            if (cardElement is InputNumber)
                return RenderInputNumber((InputNumber)cardElement, context);

            if (cardElement is InputDate)
                return RenderInputDate((InputDate)cardElement, context);

            if (cardElement is InputTime)
                return RenderInputTime((InputTime)cardElement, context);

            if (cardElement is InputToggle)
                return RenderInputToggle((InputToggle)cardElement, context);

            return null;
        }

        /// <summary>
        /// Get fallback text from the speech element 
        /// </summary>
        /// <param name="text"></param>
        /// <returns></returns>
        public string GetFallbackText(CardElement cardElement)
        {
#if WPF
            if (!string.IsNullOrEmpty(cardElement.Speak))
            {

                // TODO: Fix xamarin fallback
                var doc = new System.Xml.XmlDocument();
                var xml = cardElement.Speak;
                if (!xml.Trim().StartsWith("<"))
                    xml = $"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<Speak>{xml}</Speak>";
                else if (!xml.StartsWith("<?xml "))
                    xml = $"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n{xml}";
                doc.LoadXml(xml);
                return doc.InnerText;
            }
#endif

            return null;
        }

    }
}