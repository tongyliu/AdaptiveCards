using System.Diagnostics;
using System.Windows;
#if WPF
using System.Windows.Controls;
#elif Xamarin
using Xamarin.Forms;
#endif

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
