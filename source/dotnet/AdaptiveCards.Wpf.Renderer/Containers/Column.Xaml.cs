using System.Windows;

namespace Adaptive
{
    public partial class Column
    {
        /// <summary>
        /// Render this element
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public override FrameworkElement Render(RenderContext context)
        {
            if (AlternateRenderer != null)
                return AlternateRenderer(this, context);

            return base.Render(context);
        }
    }
}