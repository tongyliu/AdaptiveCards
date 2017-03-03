using System.Diagnostics;
using System.Windows;
using Xamarin.Forms;

namespace Adaptive
{
    public abstract partial class TypedElement
    {
        public virtual FrameworkElement Render(RenderContext context)
        {
            Debug.WriteLine($"** WARNING: {this.GetType()} does not have Render() implemented");
            return new Grid();
        }
    }
}
