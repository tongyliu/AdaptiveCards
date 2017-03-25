using System.Windows;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Adaptive.Renderers
{
    public partial class XamlRenderer
        : AdaptiveRenderer<FrameworkElement, RenderContext>
    {
        /// <summary>
        /// Render this element
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        protected override FrameworkElement RenderColumn(Column column, RenderContext context)
        {
            return this.RenderContainer(column, context);
        }

        //public override async Task PreRender()
        //{
        //    List<Task> tasks = new List<Task>();
        //    foreach (var item in this.Items)
        //        tasks.Add(item.PreRender());

        //    await Task.WhenAll(tasks.ToArray());
        //}

    }
}