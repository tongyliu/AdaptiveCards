
namespace Adaptive
{
    public partial class CardElement
    {
        /// <summary>
        /// Get fallback text from the speech element 
        /// </summary>
        /// <param name="text"></param>
        /// <returns></returns>
        public string GetFallbackText()
        {
#if WPF
            if (!string.IsNullOrEmpty(this.Speak))
            {

                // TODO: Fix xamarin fallback
                var doc = new System.Xml.XmlDocument();
                var xml = this.Speak;
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