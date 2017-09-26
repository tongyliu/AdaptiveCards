#include "pch.h"
#include "AdaptiveCard.h"
#include "AdaptiveShowCardAction.h"
#include "Util.h"

using namespace Microsoft::WRL;
using namespace ABI::AdaptiveCards::XamlCardRenderer;

namespace AdaptiveCards { namespace XamlCardRenderer
{
    HRESULT AdaptiveShowCardAction::RuntimeClassInitialize() noexcept try
    {
        m_sharedShowCardAction = std::make_shared<ShowCardAction>();
        return S_OK;
    } CATCH_RETURN;

    _Use_decl_annotations_
    HRESULT AdaptiveShowCardAction::RuntimeClassInitialize(const std::shared_ptr<AdaptiveCards::ShowCardAction>& sharedShowCardAction)
    {
        m_sharedShowCardAction = sharedShowCardAction;
        return S_OK;
    }

    IFACEMETHODIMP AdaptiveShowCardAction::get_Card(ABI::AdaptiveCards::XamlCardRenderer::IAdaptiveCard** card)
    {
        return MakeAndInitialize<AdaptiveCard>(card, m_sharedShowCardAction->GetCard());
    }

    IFACEMETHODIMP AdaptiveShowCardAction::put_Card(ABI::AdaptiveCards::XamlCardRenderer::IAdaptiveCard* /*card*/)
    {
        return E_NOTIMPL;
    }

    _Use_decl_annotations_
    HRESULT AdaptiveShowCardAction::get_Title(HSTRING* title)
    {
        return UTF8ToHString(m_sharedShowCardAction->GetTitle(), title);
    }

    _Use_decl_annotations_
    HRESULT AdaptiveShowCardAction::put_Title(HSTRING title)
    {
        std::string out;
        RETURN_IF_FAILED(HStringToUTF8(title, out));
        m_sharedShowCardAction->SetTitle(out);
        return S_OK;
    }

    _Use_decl_annotations_
    HRESULT AdaptiveShowCardAction::get_ActionType(ABI::AdaptiveCards::XamlCardRenderer::ActionType* actionType)
    {
        *actionType = ABI::AdaptiveCards::XamlCardRenderer::ActionType::ShowCard;
        return S_OK;
    }

    _Use_decl_annotations_
    HRESULT AdaptiveShowCardAction::get_Id(HSTRING* id)
    {
        return UTF8ToHString(m_sharedShowCardAction->GetId(), id);
    }

    _Use_decl_annotations_
    HRESULT AdaptiveShowCardAction::put_Id(HSTRING id)
    {
        std::string out;
        RETURN_IF_FAILED(HStringToUTF8(id, out));
        m_sharedShowCardAction->SetId(out);
        return S_OK;
    }

    _Use_decl_annotations_
    HRESULT AdaptiveShowCardAction::get_Type(HSTRING* type)
    {
        ::ActionType typeEnum;
        RETURN_IF_FAILED(get_ActionType(&typeEnum));
        return ProjectedActionTypeToHString(typeEnum, type);
    }
}}
