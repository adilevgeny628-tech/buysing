"""
Customer Service Agent - 客服Agent
负责多模态客服、情感交流、问题处理等
"""

from typing import Dict, List, Any, Optional
import logging
from datetime import datetime
from core.agents.base_agent import BaseAgent

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class CustomerServiceAgent(BaseAgent):
    """
    客服Agent
    """

    def __init__(self, agent_id: str = "customer_service", config: Optional[Dict] = None):
        super().__init__(
            agent_id=agent_id,
            name="Customer Service Agent",
            role="客户服务",
            config=config
        )
        self.conversation_history = {}
        self.knowledge_base = {}
        self.sentiment_analyzer = None

    async def process(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """
        处理客服任务
        
        Args:
            task: 任务字典
            
        Returns:
            处理结果
        """
        task_type = task.get("task_type", "message_response")
        self.status = "busy"
        
        try:
            if task_type == "message_response":
                result = await self.respond_to_message(task.get("parameters", {}))
            elif task_type == "image_analysis":
                result = await self.analyze_image(task.get("parameters", {}))
            elif task_type == "issue_resolution":
                result = await self.resolve_issue(task.get("parameters", {}))
            elif task_type == "refund_processing":
                result = await self.process_refund(task.get("parameters", {}))
            elif task_type == "sentiment_analysis":
                result = await self.analyze_sentiment(task.get("parameters", {}))
            else:
                result = {"error": f"Unknown task type: {task_type}"}
            
            self.status = "ready"
            return result
            
        except Exception as e:
            logger.error(f"Task processing failed: {e}")
            self.status = "ready"
            return {"error": str(e)}

    async def think(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        思考过程 - 基于上下文进行客服决策
        
        Args:
            context: 上下文信息
            
        Returns:
            思考结果
        """
        logger.info(f"Customer Service Agent thinking about context: {context}")
        
        customer = context.get("customer", {})
        issue_type = context.get("issue_type", "inquiry")
        urgency = context.get("urgency", "normal")
        
        thoughts = {
            "customer_analysis": f"Analyzing customer profile: {customer.get('id', 'unknown')}",
            "issue_assessment": f"Issue type: {issue_type}, urgency: {urgency}",
            "response_strategy": "Empathetic and solution-oriented approach",
            "escalation_check": "Determine if human intervention needed",
            "follow_up_plan": "Schedule follow-up if needed"
        }
        
        return thoughts

    async def respond_to_message(self, parameters: Dict) -> Dict[str, Any]:
        """
        回复消息
        
        Args:
            parameters: 参数字典
            
        Returns:
            回复结果
        """
        logger.info("Responding to message")
        
        customer_id = parameters.get("customer_id")
        message = parameters.get("message", "")
        language = parameters.get("language", "en")
        platform = parameters.get("platform", "email")
        
        sentiment = await self._analyze_sentiment(message)
        
        response = {
            "customer_id": customer_id,
            "message": message,
            "language": language,
            "platform": platform,
            "sentiment": sentiment,
            "response": self._generate_response(message, sentiment, language),
            "suggested_actions": [],
            "follow_up_needed": False
        }
        
        if sentiment == "negative":
            response["suggested_actions"] = ["offer_discount", "escalate_to_human"]
            response["follow_up_needed"] = True
        elif sentiment == "neutral":
            response["suggested_actions"] = ["provide_information"]
        
        await self.remember(f"conversation_{customer_id}", {
            "timestamp": datetime.now().isoformat(),
            "message": message,
            "response": response["response"],
            "sentiment": sentiment
        })
        
        return {
            "status": "success",
            "data": response
        }

    async def analyze_image(self, parameters: Dict) -> Dict[str, Any]:
        """
        分析图片
        
        Args:
            parameters: 参数字典
            
        Returns:
            分析结果
        """
        logger.info("Analyzing image")
        
        image_url = parameters.get("image_url")
        customer_id = parameters.get("customer_id")
        issue_type = parameters.get("issue_type", "unknown")
        
        image_analysis = {
            "customer_id": customer_id,
            "image_url": image_url,
            "issue_type": issue_type,
            "detected_objects": ["product", "packaging", "damage"],
            "damage_detected": True,
            "damage_severity": "moderate",
            "damage_description": "Visible damage to packaging, product appears intact",
            "confidence": 0.92,
            "recommended_action": "offer_replacement_or_refund",
            "response": self._generate_image_response(issue_type, True)
        }
        
        return {
            "status": "success",
            "data": image_analysis
        }

    async def resolve_issue(self, parameters: Dict) -> Dict[str, Any]:
        """
        解决问题
        
        Args:
            parameters: 参数字典
            
        Returns:
            解决结果
        """
        logger.info("Resolving issue")
        
        issue_id = parameters.get("issue_id")
        customer_id = parameters.get("customer_id")
        issue_type = parameters.get("issue_type")
        resolution_type = parameters.get("resolution_type")
        
        resolution = {
            "issue_id": issue_id,
            "customer_id": customer_id,
            "issue_type": issue_type,
            "resolution_type": resolution_type,
            "status": "resolved",
            "resolution_details": {},
            "customer_notification": "",
            "follow_up_scheduled": False
        }
        
        if resolution_type == "replacement":
            resolution["resolution_details"] = {
                "action": "send_replacement",
                "shipping_method": "express",
                "estimated_delivery": (datetime.now() + datetime.timedelta(days=3)).isoformat(),
                "tracking": "will_be_provided"
            }
            resolution["customer_notification"] = "We've sent you a replacement via express shipping. You'll receive it within 3 days."
        
        elif resolution_type == "refund":
            resolution["resolution_details"] = {
                "action": "process_refund",
                "amount": parameters.get("refund_amount"),
                "method": "original_payment",
                "processing_time": "3-5 business days"
            }
            resolution["customer_notification"] = f"Your refund of ${parameters.get('refund_amount', 0)} has been processed. You should see it in 3-5 business days."
        
        elif resolution_type == "discount":
            resolution["resolution_details"] = {
                "action": "provide_discount",
                "discount_code": "SORRY20",
                "discount_percentage": 20,
                "valid_for": "30 days"
            }
            resolution["customer_notification"] = "We apologize for the inconvenience. Here's a 20% discount code for your next purchase: SORRY20"
        
        await self.remember(f"issue_resolution_{issue_id}", resolution)
        
        return {
            "status": "success",
            "data": resolution
        }

    async def process_refund(self, parameters: Dict) -> Dict[str, Any]:
        """
        处理退款
        
        Args:
            parameters: 参数字典
            
        Returns:
            退款处理结果
        """
        logger.info("Processing refund")
        
        order_id = parameters.get("order_id")
        customer_id = parameters.get("customer_id")
        refund_amount = parameters.get("amount")
        reason = parameters.get("reason")
        
        refund = {
            "refund_id": f"refund_{datetime.now().timestamp()}",
            "order_id": order_id,
            "customer_id": customer_id,
            "amount": refund_amount,
            "reason": reason,
            "status": "processing",
            "created_at": datetime.now().isoformat(),
            "estimated_completion": (datetime.now() + datetime.timedelta(days=5)).isoformat(),
            "method": "original_payment"
        }
        
        return {
            "status": "success",
            "data": refund,
            "message": "Refund processed successfully"
        }

    async def analyze_sentiment(self, parameters: Dict) -> Dict[str, Any]:
        """
        情感分析
        
        Args:
            parameters: 参数字典
            
        Returns:
            情感分析结果
        """
        logger.info("Analyzing sentiment")
        
        text = parameters.get("text", "")
        
        sentiment_result = {
            "text": text,
            "sentiment": await self._analyze_sentiment(text),
            "confidence": 0.87,
            "emotions": {
                "joy": 0.15,
                "anger": 0.45,
                "sadness": 0.25,
                "fear": 0.05,
                "neutral": 0.10
            },
            "key_phrases": ["disappointed", "quality", "expectations"],
            "suggested_response_tone": "empathetic_and_apologetic"
        }
        
        return {
            "status": "success",
            "data": sentiment_result
        }

    async def _analyze_sentiment(self, text: str) -> str:
        """分析文本情感"""
        negative_words = ["disappointed", "angry", "frustrated", "terrible", "worst", "hate"]
        positive_words = ["happy", "great", "excellent", "love", "amazing", "wonderful"]
        
        text_lower = text.lower()
        
        negative_count = sum(1 for word in negative_words if word in text_lower)
        positive_count = sum(1 for word in positive_words if word in text_lower)
        
        if negative_count > positive_count:
            return "negative"
        elif positive_count > negative_count:
            return "positive"
        return "neutral"

    def _generate_response(self, message: str, sentiment: str, language: str) -> str:
        """生成回复"""
        if sentiment == "negative":
            return "I'm truly sorry to hear about your experience. I understand how frustrating this must be. Let me help you resolve this issue right away."
        elif sentiment == "positive":
            return "Thank you so much for your kind words! We're thrilled that you had a great experience. Is there anything else I can help you with?"
        return "Thank you for reaching out. I'd be happy to help you with your inquiry. Could you please provide more details?"

    def _generate_image_response(self, issue_type: str, damage_detected: bool) -> str:
        """生成图片回复"""
        if damage_detected:
            return "I can see the damage in the image. I'm very sorry about this. I'll process a replacement for you right away."
        return "Thank you for sharing this image. Let me help you with your concern."