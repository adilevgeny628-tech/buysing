"""
BuysingAgent - Multi-Agent Cross-Border E-commerce AGI System
"""

__version__ = "1.0.0"
__author__ = "BuysingAgent Team"

from core.orchestrator.orchestrator import Orchestrator
from core.memory.memory_layer import MemoryLayer
from agents.product.product_selection_agent import ProductSelectionAgent
from agents.marketing.marketing_agent import MarketingAgent
from agents.logistics.logistics_agent import LogisticsAgent
from agents.customer.customer_service_agent import CustomerServiceAgent
from agents.compliance.compliance_agent import ComplianceAgent

__all__ = [
    "Orchestrator",
    "MemoryLayer",
    "ProductSelectionAgent",
    "MarketingAgent",
    "LogisticsAgent",
    "CustomerServiceAgent",
    "ComplianceAgent"
]